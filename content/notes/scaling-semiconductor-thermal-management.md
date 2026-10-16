---
title: "Scaling laws for semiconductor thermal management"
date: 2023-12-02
summary: "A back-of-the-envelope scaling analysis of conduction, convection and phase change that shows where each cooling mechanism stops scaling, and why the industry is moving to multiphase."
tags: ["Heat transfer", "Scaling", "Semiconductor", "Multiphase"]
math: true
toc: true
---

Before running a single simulation it is worth asking which cooling mechanism
*can* scale. A five-minute scaling analysis usually answers the question.

## Conduction

Heat must first travel from the transistor to the surface. The bottleneck is the
thermal resistance of the stack,

{{< eq label="1" >}}
R_{cond} = \frac{t}{k A}
{{< /eq >}}

Because the heat is generated in a volume that shrinks with the technology node
while the surface area shrinks more slowly, the *density* of heat flux at the
surface grows. Conduction sets a floor that no cooler can beat.

## Single-phase convection

Once at the surface, heat leaves by convection. The heat-transfer coefficient
scales with the flow velocity to roughly the one-half power in a laminar
boundary layer,

{{< eq label="2" >}}
Nu \sim Re^{1/2} Pr^{1/3}
{{< /eq >}}

Pumping power grows as the *cube* of the velocity, so the return on investment
falls quickly. This is the wall that air and single-phase liquid cooling run into.

## Phase change

Boiling removes heat by the latent heat of vaporisation, which is orders of
magnitude larger than the sensible heat capacity. That is why two-phase cooling
breaks the single-phase scaling wall.

{{< callout type="result" title="The conclusion" >}}
Single-phase cooling scales well until it does not, and the wall is set by the
pumping-power penalty. Multiphase and field-assisted cooling change the exponent,
which is why they are worth the added complexity.
{{< /callout >}}

## Takeaway

The scaling analysis explains the structure of my research: single-phase CFP
simulation sets the baseline, and multiphase Taylor-bubble flow and EHD forcing are
the two levers that change the exponent rather than merely pushing harder on the
same curve.
