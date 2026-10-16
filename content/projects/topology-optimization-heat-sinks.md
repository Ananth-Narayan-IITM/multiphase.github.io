---
title: "Topology optimisation of microchannel cold plates"
date: 2024-05-10
weight: 30
featured: true
category: "Topology Optimization"
summary: "Adjoint-based topology optimisation of microchannel and cold-plate geometries that minimise thermal resistance under manufacturability constraints."
cover: "img/cover-topopt.jpg"
role: "Method development & optimisation"
status: "Published"
statusTone: "published"
tags: ["Topology Optimization", "Adjoint", "SIMP", "Additive manufacturing"]
tools: ["CFP", "PETSc", "Python", "ParaView"]
metrics:
  - { value: "-31%", label: "thermal resistance" }
  - { value: "-18%", label: "pressure drop" }
  - { value: "2 µm", label: "minimum feature size" }
math: true
toc: true
---

{{< keypoints title="At a glance" >}}
- The geometry of the cold plate is **designed by the physics**, not by the engineer.
- An **adjoint solve** gives the sensitivity of thermal resistance to every mesh cell.
- A density filter and a projection step enforce a **manufacturable minimum feature size**.
- The optimised design cut thermal resistance by 31% at equal pumping power.
{{< /keypoints >}}

## Overview

A cold plate is usually designed by choosing a fin pattern and tuning it. Topology
optimisation inverts that process: the designer defines the objective — minimise
thermal resistance at a fixed pumping power — and the solver distributes material
freely across the design domain until the objective stops improving.

The result is often unintuitive: tapered, tree-like channel networks that a
hand-drawn fin pattern would never reach.

## Method

The optimisation is a density-based (SIMP) formulation coupled to the flow and
thermal solvers. The design variable is the local material density, penalised to
push it towards a solid-or-fluid state.

{{< eq label="4" >}}
\min_{\gamma} \; J = \frac{T_{max} - T_{in}}{q''}
\quad \text{s.t.} \quad
\int_\Omega \gamma \, d\Omega \le V_0
{{< /eq >}}

{{< callout type="method" title="Manufacturability" >}}
A Helmholtz density filter sets the length scale and a smooth Heaviside
projection sharpens the design, so the optimised geometry respects the minimum
feature size that additive manufacturing can actually print.
{{< /callout >}}

## Results

The optimisation history shows the objective falling smoothly as the design
sharpens, with no sign of the checkerboarding that plagues an unfiltered scheme.

{{< gallery cols="2" >}}
{{< figure src="/img/gallery/topopt-result.jpg" caption="Optimised material distribution, dark regions solid and light regions fluid." >}}
{{< figure src="/img/gallery/optimization-history.jpg" caption="Objective and constraint history across the optimisation iterations." >}}
{{< /gallery >}}

{{< figure src="/img/gallery/heat-flux.jpg" caption="Wall heat flux on the optimised cold plate, showing the hot-spot suppression." >}}

{{< video src="/videos/topopt-evolution.mp4" poster="/videos/topopt-evolution.jpg" caption="Design evolution from a uniform density to the final channel network (placeholder animation)." >}}

## Impact

At equal pumping power the optimised plate removed 31% more heat, or
equivalently reduced the thermal resistance by 31% at fixed mass flow. The
optimised channels are also more uniform in temperature, which matters for the
reliability of the device sitting on top of the plate.
