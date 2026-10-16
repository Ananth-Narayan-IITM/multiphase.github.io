---
title: "SIMP or level-set: choosing a topology optimisation scheme"
date: 2024-04-05
summary: "When to reach for density-based SIMP and when a level-set or phase-field formulation is the better fit, from the point of view of a thermal design problem."
tags: ["Topology Optimization", "SIMP", "Level-set", "Adjoint"]
math: true
toc: true
---

Topology optimisation asks a simple question — where should the material go? —
and the answer depends less on the objective than on how the design is
represented.

## Density-based (SIMP)

The design variable is a continuous density field, penalised to push it towards
solid or fluid.

{{< eq label="1" >}}
E(\rho) = E_{min} + \rho^{p} \left( E_0 - E_{min} \right), \qquad p \ge 3
{{< /eq >}}

- **Strengths:** simple, robust, few design variables, easy to add constraints.
- **Weaknesses:** intermediate densities unless penalised, and the boundary needs
  a post-processing step.

## Level-set and phase-field

The design is represented by the zero level set of a scalar function, which gives a
crisp boundary by construction.

{{< eq label="2" >}}
\rho(\phi) = H(\phi) \quad \text{with} \quad
H(\phi) = \tfrac{1}{2}\left( 1 + \tanh \frac{\phi}{2\epsilon} \right)
{{< /eq >}}

- **Strengths:** crisp boundaries, easy to couple to shape derivatives.
- **Weaknesses:** the topological derivative is needed to nucleate new holes,
  and the cost per iteration is higher.

{{< callout type="tip" title="Rule of thumb" >}}
Start with SIMP. It gets you 80% of the insight for 20% of the effort. Move to a
level-set formulation only when you need crisp boundaries for a downstream
simulation, or when the manufacturability constraint is the hard part.
{{< /callout >}}

## What matters for a cold plate

| Requirement | SIMP | Level-set |
| --- | --- | --- |
| Minimum feature size | needs a filter | built in |
| Re-simulation of the design | needs post-processing | direct |
| Multi-physics constraints | straightforward | possible |
| Implementation effort | low | high |

## Takeaway

For the cold plate in the [topology-optimisation project](/projects/topology-optimization-heat-sinks/)
I used SIMP with a density filter and a projection step. It gave a manufacturable
geometry, and the filter did the work that a level-set formulation would have done
by construction.
