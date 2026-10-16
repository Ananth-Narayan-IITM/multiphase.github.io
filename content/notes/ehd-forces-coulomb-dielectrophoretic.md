---
title: "Electrohydrodynamic forces, term by term"
date: 2024-02-18
summary: "A short derivation of the electric body force in an isothermal, weakly ionised gas, and which terms survive in a typical corona-driven cooling problem."
tags: ["Electrohydrodynamics", "Electric Field", "Heat transfer"]
math: true
toc: true
---

When the electric field is coupled to a flow, the momentum equation gains a body
force. The full expression is more intimidating than it needs to be, and knowing
which terms survive a given regime saves a lot of implementation effort.

## The full force

For a dielectric with permittivity that may vary with temperature, the electric
body force is the divergence of the Maxwell stress tensor.

{{< eq label="1" >}}
\mathbf{f}_e = \rho_c \mathbf{E}
- \tfrac{1}{2} E^2 \nabla \varepsilon
+ \nabla \left[ \tfrac{1}{2} \rho \frac{\partial \varepsilon}{\partial \rho} E^2 \right]
{{< /eq >}}

## The three terms

- **Coulomb force** {{< m >}}\rho_c \mathbf{E}{{< /m >}} — acts on the net charge density. This
  is the term that drives the ionic wind.
- **Dielectrophoretic force** {{< m >}}-\tfrac{1}{2} E^2 \nabla \varepsilon{{< /m >}} — acts on a
  gradient of permittivity. Important in two-phase flow where the permittivity
  jumps across the interface.
- **Electrostrictive force** — the last term. It is the gradient of a scalar, so it
  can be absorbed into the pressure for an incompressible, single-phase flow.

{{< callout type="warning" title="Two-phase trap" >}}
In a two-phase problem the permittivity gradient across the interface is *not*
small, so the dielectrophoretic term cannot be dropped. It is often the dominant
term at the interface.
{{< /callout >}}

## What I use

For single-phase corona cooling I keep the Coulomb force and drop the other two.
For two-phase flow I keep the Coulomb and dielectrophoretic terms. The
electrostrictive term is absorbed into the pressure in both cases.

## Where this is used

The single-phase model appears in the
[electric-field cooling project](/projects/electrohydrodynamic-heat-transfer/);
the two-phase version is part of the current work on coupled bubble and EHD
cooling.
