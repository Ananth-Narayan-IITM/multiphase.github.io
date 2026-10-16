---
title: "Rhie–Chow interpolation, and why collocated grids need it"
date: 2024-08-12
summary: "Why a naive collocated pressure–velocity coupling produces checkerboard pressure fields, and how the Rhie–Chow momentum interpolation removes them."
tags: ["CFD", "Numerical methods", "CFP"]
math: true
toc: true
---

A collocated grid stores pressure and velocity at the same location. It is
convenient — one control volume, one set of fluxes — but it hides a trap that has
cost many people a week of debugging: the **checkerboard pressure mode**.

## The problem

Discretise the pressure gradient with a centred difference and the velocity
divergence with a centred difference, and the two operators do not see each other's
odd–even mode. A pressure field that alternates cell by cell,

{{< eq label="1" >}}
p_{i,j} = (-1)^{i+j} \hat{p}
{{< /eq >}}

produces a discrete pressure gradient that vanishes identically. The pressure is
invisible to the momentum equations, so the solver is free to fill the field with
high-frequency noise that satisfies the discrete equations but not the continuous ones.

## The fix

Rhie and Chow proposed to interpolate the *face* velocity from the momentum
equations rather than from the cell-centred velocity directly. The face velocity then
contains the pressure gradient at the face,

{{< eq label="2" >}}
u_f = \overline{u}_f - d_f \left( \nabla p_f - \overline{\nabla p}_f \right)
{{< /eq >}}

The second term is the key: it is zero for a smooth pressure field, but it is
*not* zero for a checkerboard mode. The pressure becomes visible to the flux
again, and the odd–even mode is suppressed.

{{< callout type="tip" title="Practical note" >}}
The Rhie–Chow correction is a *numerical* stabilisation, not a physical term.
Keep it in the face flux, not in the cell-centred velocity, or you will damp
the physical solution along with the checkerboard.
{{< /callout >}}

## What to check

- The face flux must be conservative: the sum of the outward fluxes of a cell
  must equal the change of the cell's conserved quantity.
- The pressure correction must converge *and* the corrected flux must satisfy the
  continuity equation to the same tolerance.
- A grid-convergence study must show second-order behaviour; if the order collapses,
  the interpolation is usually the culprit.

## Why it matters here

Every solver in the CFP framework uses this interpolation. It is also the reason the
pressure solve is the runtime bottleneck: it is the price we pay for a stable
collocated scheme, and the reason the [GPU port](/projects/gpu-navier-stokes/)
targets exactly that solve.
