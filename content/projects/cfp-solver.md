---
title: "CFP: a high-fidelity framework for internal and multiphase flows"
date: 2024-09-01
weight: 10
featured: true
category: "CFP"
summary: "A finite-volume framework for incompressible and low-Mach flows with adaptive mesh refinement, validated against benchmark experiments for internal and multiphase flow."
cover: "img/cover-cfp.jpg"
role: "Solver architect & lead developer"
status: "Ongoing"
statusTone: "ongoing"
tags: ["CFP", "CFD", "Turbulence", "HPC"]
tools: ["C++17", "OpenFOAM", "MPI", "ParaView"]
metrics:
  - { value: "2.1B", label: "cells per production run" }
  - { value: "96%", label: "parallel efficiency at 8k cores" }
  - { value: "3", label: "benchmark cases validated" }
math: true
toc: true
---

{{< keypoints title="At a glance" >}}
- A **pressure-based finite-volume solver** for incompressible and low-Mach flows.
- Adaptive mesh refinement on an octree, with dynamic load balancing across MPI ranks.
- Verified with manufactured solutions and validated against channel-flow experiments.
- Now the workhorse behind all of my multiphase and electrohydrodynamic studies.
{{< /keypoints >}}

## Overview

**CFP** (computational fluid physics) is the in-house framework I maintain for
resolving the flow physics that dominates electronics cooling. The goal is not to
reimplement a general-purpose CFD package, but to keep a solver that is transparent
enough to extend for coupled multiphase, thermal and electric-field physics without
fighting a legacy architecture.

The framework solves the variable-density, low-Mach Navier–Stokes equations in a
collocated finite-volume formulation, with a Rhie–Chow interpolation to suppress
checkerboard pressure modes and a pressure-correction outer loop.

{{< eq label="1" >}}
\frac{\partial \rho \mathbf{u}}{\partial t}
+ \nabla \cdot \left( \rho \mathbf{u} \mathbf{u} \right)
= -\nabla p + \nabla \cdot \boldsymbol{\tau} + \mathbf{f}
{{< /eq >}}

{{< callout type="method" title="Design principle" >}}
One solver core, many physics modules. Momentum, energy and species transport share
a single discretisation layer so that a new coupling only has to define its source
terms, not a new matrix assembly.
{{< /callout >}}

## Method

- **Discretisation.** Second-order upwind convection on a collocated grid, with
  a pressure-implicit splitting for the pressure–velocity coupling.
- **Refinement.** An octree mesh that refines on interface curvature, velocity
  gradients and wall-normal resolution, targeting a wall coordinate of {{< m >}}y^+ < 1{{< /m >}} in the boundary layers.
- **Parallelism.** Domain decomposition with MPI, halo exchange overlapping
  computation and communication, and dynamic repartitioning after refinement.
- **Time integration.** Implicit dual time stepping with adaptive step control for
  the low-Mach acoustic limit.

## Results

The refined mesh resolves the near-wall structures that dominate convective heat
transfer while keeping the bulk of the domain coarse.

{{< gallery cols="2" >}}
{{< figure src="/img/gallery/mesh.jpg" caption="Adaptive octree mesh with resolved boundary layers." >}}
{{< figure src="/img/gallery/velocity-contour.jpg" caption="Instantaneous velocity magnitude in a turbulent channel." >}}
{{< /gallery >}}

{{< figure src="/img/gallery/residuals.jpg" caption="Normalised residuals for pressure and momentum, showing a clean convergence to machine-level tolerance." >}}

A short animation of the vortical structures extracted from the same run:

{{< video src="/videos/vorticity.mp4" poster="/videos/vorticity.jpg" caption="Q-criterion iso-surfaces coloured by velocity magnitude (placeholder animation)." >}}

## Impact

The framework is now the numerical backbone of my other projects: the
electrohydrodynamic model, the multiphase Taylor-bubble solver and the adjoint
topology-optimisation loop all reuse the same core. Consolidating the physics in
one verified codebase shortened the development time of each new study from months
to weeks.

## What comes next

- GPU port of the pressure Poisson solve, which currently dominates runtime.
- A conservative sharp-interface scheme for high density ratios.
- Automatic differentiation through the solver for gradient-based design.
