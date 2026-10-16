---
title: "Multiphase Taylor-bubble flow for semiconductor cooling"
date: 2024-03-01
weight: 40
featured: true
category: "Multiphase Taylor Bubble"
summary: "Interface-resolved simulation of confined Taylor-bubble trains, connecting bubble dynamics to wall heat transfer in semiconductor cold plates."
cover: "img/cover-taylor.jpg"
role: "PhD research"
status: "Ongoing"
statusTone: "ongoing"
tags: ["Multiphase", "Taylor bubble", "VOF", "Conjugate heat transfer"]
tools: ["CFP", "Basilisk", "Python", "ParaView"]
metrics:
  - { value: "3.4×", label: "wall heat-transfer gain" }
  - { value: "Ca = 0.12", label: "capillary number" }
  - { value: "0.85", label: "void fraction" }
math: true
toc: true
---

{{< keypoints title="At a glance" >}}
- Confined **Taylor bubbles** re-circulate the liquid film that cools the wall.
- The bubbles are resolved **directly** with a volume-of-fluid interface.
- Wall heat transfer rose **3.4×** over single-phase flow at equal mass flow.
- The simulation is coupled to a **conjugate** solid conduction model.
{{< /keypoints >}}

## Overview

In a narrow channel a long gas bubble fills most of the cross-section and is
separated from the wall by a thin liquid film. This is a **Taylor bubble**, and the
liquid it displaces is forced into a recirculating film that scrubs the wall. The
effect on heat transfer is large: the bubble acts as a moving pump that keeps
replacing the hot near-wall liquid with cold bulk liquid.

This is the core of my PhD work, and it is the reason I care about multiphase flow
in the first place: it is a genuinely coupled problem where the interface motion
sets the thermal boundary condition.

## Method

The interface is captured with a volume-of-fluid (VOF) method on the octree mesh,
with a geometric reconstruction of the interface and a continuum surface force for the
surface tension. The energy equation is solved in both phases and coupled to
conduction in the solid.

{{< eq label="5" >}}
\frac{\partial \alpha_l}{\partial t}
+ \nabla \cdot \left( \alpha_l \mathbf{u} \right)
= 0, \qquad \alpha_g = 1 - \alpha_l
{{< /eq >}}

{{< eq label="6" >}}
\mathbf{f}_\sigma = \sigma \kappa \mathbf{n} \, \delta_s
{{< /eq >}}

{{< callout type="warning" title="Sharp interfaces need resolution" >}}
The heat-transfer gain is sensitive to the film thickness. Without adaptive
refinement in the film the numerical diffusion smears the interface and
under-predicts the gain by a factor of two.
{{< /callout >}}

## Results

The bubble deforms as the capillary number grows, the film thins, and the wall
heat transfer peaks in the wake of the bubble.

{{< gallery cols="2" >}}
{{< figure src="/img/gallery/volume-fraction.jpg" caption="Volume fraction field showing the resolved liquid film around a Taylor bubble." >}}
{{< figure src="/img/gallery/bubble-shape.jpg" caption="Bubble shape as a function of the capillary number." >}}
{{< /gallery >}}

{{< figure src="/img/gallery/multiphase-3d.jpg" caption="Taylor-bubble train in a square channel, coloured by temperature." >}}

{{< video src="/videos/taylor-bubble.mp4" poster="/videos/taylor-bubble.jpg" caption="Rising bubble train and its wall heat-transfer footprint (placeholder animation)." >}}

## Impact

At equal mass flow the Taylor-bubble flow removed 3.4× more heat than
single-phase flow, because the thin film keeps the wall temperature close to the
bulk temperature. The open question — and the subject of my current work — is how to
distribute these bubbles with topology optimisation so that the gain is uniform
across the whole plate.
