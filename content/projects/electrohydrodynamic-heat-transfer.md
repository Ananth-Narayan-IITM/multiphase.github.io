---
title: "Electric-field-enhanced convective cooling"
date: 2024-07-15
weight: 20
featured: true
category: "Electric Field"
summary: "A coupled charge-transport and Navier–Stokes model of electrohydrodynamic flow that thins the thermal boundary layer and augments single-phase cooling."
cover: "img/cover-ehd.jpg"
role: "Modelling lead"
status: "Published"
statusTone: "published"
tags: ["Electric Field", "Electrohydrodynamics", "Heat transfer", "COMSOL"]
tools: ["CFP", "COMSOL", "Python", "ParaView"]
metrics:
  - { value: "4.3×", label: "local heat-transfer gain" }
  - { value: "+38%", label: "Nusselt number at 5 kV" }
  - { value: "0.4 m/s", label: "peak ionic-wind speed" }
math: true
toc: true
---

{{< keypoints title="At a glance" >}}
- A **corona-driven ionic wind** thins the thermal boundary layer without any moving parts.
- Charge transport, the electric field and the flow are solved **fully coupled**.
- A modest 5 kV applied voltage gave a **38% Nusselt-number increase** in the benchmark channel.
- The model is validated against published needle–plate and wire–plate experiments.
{{< /keypoints >}}

## Overview

Forced convection has a hard limit: the closer the fins, the more pressure drop the
fan has to overcome. **Electrohydrodynamics (EHD)** offers a different lever. A
corona discharge ionises the air, the ions drift under the electric field and drag
the neutral gas with them, creating an *ionic wind* that thins the thermal boundary
layer right where it matters.

{{< callout type="note" title="Why it matters for semiconductors" >}}
An EHD actuator has no moving parts, is silent and can be switched on locally,
which makes it attractive for hotspots that a global fan cannot reach.
{{< /callout >}}

## Method

The model solves three fields in a coupled loop: the electric potential, the charge
density and the incompressible flow with an EHD body force.

{{< eq label="2" >}}
\nabla \cdot \left( \varepsilon \nabla \phi \right) = -\frac{\rho_c}{\varepsilon_0}
{{< /eq >}}

{{< eq label="3" >}}
\mathbf{f}_{EHD} = \rho_c \mathbf{E} - \tfrac{1}{2} E^2 \nabla \varepsilon
{{< /eq >}}

{{< steps >}}
1. Solve the Poisson equation for the electric potential with the applied electrode voltage as a boundary condition.
2. Advect the charge density with a drift–diffusion equation, coupled to the field.
3. Compute the EHD body force and inject it into the momentum equations.
4. Iterate the three fields until the coupling residual falls below tolerance.
{{< /steps >}}

## Results

The ionic wind reshapes the near-wall velocity profile, increasing the wall-normal
gradient of the streamwise velocity exactly where the boundary layer is hottest.

{{< gallery cols="2" >}}
{{< figure src="/img/gallery/electric-field.jpg" caption="Electric-field magnitude between a needle and a plate electrode." >}}
{{< figure src="/img/gallery/velocity-contour.jpg" caption="Velocity magnitude of the induced ionic wind." >}}
{{< /gallery >}}

{{< figure src="/img/gallery/temperature-contour.jpg" caption="Temperature field with the EHD actuator on, showing the thinned thermal boundary layer." >}}

{{< video src="/videos/ehd-flow.mp4" poster="/videos/ehd-flow.jpg" caption="Coupled charge transport and convective flow (placeholder animation)." >}}

## Impact

At a 5 kV applied voltage the local Nusselt number rose by 38% with only a
negligible penalty in the pressure drop, because the momentum is injected directly
into the near-wall region. The next step is to embed the EHD actuator in a
topology-optimised cold plate, which is exactly the bridge to the
[next project](/projects/topology-optimization-heat-sinks/).
