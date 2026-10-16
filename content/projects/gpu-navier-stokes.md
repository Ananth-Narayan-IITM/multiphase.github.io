---
title: "GPU-accelerated incompressible Navier–Stokes solver"
date: 2023-08-05
weight: 60
featured: false
category: "CFP"
summary: "A CUDA-accelerated pressure-correction solver for incompressible flow, targeting the pressure Poisson solve that dominates the runtime of the CPU framework."
cover: "img/cover-gpu.jpg"
role: "Solver development"
status: "Ongoing"
statusTone: "ongoing"
tags: ["CFP", "GPU", "HPC", "Numerical methods"]
tools: ["CUDA", "C++17", "PETSc", "Python"]
metrics:
  - { value: "14.6×", label: "speed-up vs. CPU" }
  - { value: "92%", label: "GPU utilisation" }
  - { value: "6.2", label: "GFLOPS per watt" }
math: true
toc: true
---

{{< keypoints title="At a glance" >}}
- The **pressure Poisson solve** is the runtime bottleneck of the CPU solver.
- A **matrix-free geometric multigrid** on the GPU removes most of it.
- The overall solver is **14.6× faster** at the same accuracy.
- The GPU kernel is verified to reproduce the CPU result to round-off.
{{< /keypoints >}}

## Overview

Profiling the CFP framework shows a familiar picture: the pressure Poisson
solve consumes the majority of the wall-clock time, and it is embarrassingly
parallel but memory-bandwidth bound. That is exactly the profile a GPU is built for.

This project ports that solve to CUDA with a matrix-free geometric multigrid
preconditioner, keeping the rest of the framework unchanged.

## Method

The Poisson problem is discretised as usual, but the matrix is never assembled.
Instead the multigrid hierarchy applies the stencil directly, which keeps the
arithmetic intensity high enough to hide the memory latency.

{{< eq label="8" >}}
\nabla^2 p = \frac{\rho}{\Delta t} \nabla \cdot \mathbf{u}^{*}
{{< /eq >}}

{{< steps >}}
1. Smooth the pressure error with a weighted Jacobi iteration on the fine grid.
2. Restrict the residual to a coarse grid and smooth again.
3. Prolong the coarse correction back to the fine grid and apply it.
4. Repeat until the residual falls below the outer-loop tolerance.
{{< /steps >}}

## Results

The GPU solve reproduces the CPU result to round-off while running 14.6× faster
on a single accelerator.

{{< gallery cols="2" >}}
{{< figure src="/img/gallery/residuals.jpg" caption="Convergence history of the GPU multigrid solve." >}}
{{< figure src="/img/gallery/streamlines.jpg" caption="Streamlines of the verified lid-driven cavity benchmark." >}}
{{< /gallery >}}

## Impact

The speed-up turns overnight campaigns into lunchtime ones, which changes how I
design studies: I can now afford the grid-convergence study *and* the parametric
sweep, rather than choosing between them.
