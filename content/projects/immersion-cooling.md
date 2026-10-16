---
title: "Two-phase immersion cooling of power electronics"
date: 2023-11-20
weight: 50
featured: false
category: "Multiphase Taylor Bubble"
summary: "A system-level model of pool boiling and immersion cooling for high-power electronics, coupling the boiling curve to the board-level thermal network."
cover: "img/cover-immersion.jpg"
role: "Thermal modelling"
status: "Completed"
statusTone: "active"
tags: ["Multiphase", "Boiling", "Immersion cooling", "Data center"]
tools: ["CFP", "Python", "COMSOL"]
metrics:
  - { value: "1.5 kW", label: "dissipated per module" }
  - { value: "-42%", label: "junction temperature rise" }
  - { value: "0.05 K/W", label: "module thermal resistance" }
math: true
toc: true
---

{{< keypoints title="At a glance" >}}
- Immersion cooling removes heat by **boiling the dielectric** directly on the chip.
- The boiling curve is coupled to a **board-level thermal network**.
- The model predicts the **critical heat flux** and the safe operating envelope.
- Junction temperature rise fell by 42% versus air cooling.
{{< /keypoints >}}

## Overview

Air cooling is running out of headroom for the next generation of power
electronics. **Immersion cooling** submerges the electronics in a dielectric
liquid that boils directly on the hot surface, removing heat by phase change
rather than by conduction through a thermal interface.

The design question is not whether boiling removes more heat — it does — but how to
keep the boiling stable and uniform across an entire board.

## Method

The boiling curve is modelled as a wall heat-flux boundary condition with a
temperature-dependent heat-transfer coefficient, coupled to a lumped thermal network
for the board.

{{< eq label="7" >}}
q'' = h\left(T_w - T_{sat}\right),
\qquad h = h\left(q'', \Delta T_{sub}\right)
{{< /eq >}}

{{< callout type="note" title="Critical heat flux" >}}
Beyond the critical heat flux the surface dry-out and the heat-transfer
coefficient collapses. The model tracks the margin to that limit as a design
constraint.
{{< /callout >}}

## Results

{{< gallery cols="2" >}}
{{< figure src="/img/gallery/heat-flux.jpg" caption="Wall heat flux distribution across the immersed module." >}}
{{< figure src="/img/gallery/temperature-contour.jpg" caption="Temperature field in the dielectric pool and the solid board." >}}
{{< /gallery >}}

## Impact

At 1.5 kW per module the junction temperature rise fell by 42% relative to a
forced-air design, with a module thermal resistance of 0.05 K/W. The remaining
challenge is uniformity: the boiling curve is a strong function of the local
subcooling, which varies across the board.
