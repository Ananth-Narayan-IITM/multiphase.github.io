---
title: "VOF or level-set for Taylor bubbles?"
date: 2024-06-20
summary: "A practical comparison of volume-of-fluid and level-set interface capturing for confined Taylor-bubble flows, and the trade-offs that decided the choice for my PhD work."
tags: ["Multiphase", "VOF", "Level-set", "Taylor bubble"]
math: true
toc: true
---

Both methods capture a moving interface on a fixed mesh, and both are used
widely for Taylor bubbles. The difference is *where the error goes*.

## Volume of fluid

VOF advects a volume fraction that is exactly conserved by construction. The
interface is reconstructed geometrically from the cell fractions.

{{< eq label="1" >}}
\frac{\partial \alpha}{\partial t} + \nabla \cdot \left( \alpha \mathbf{u} \right) = 0
{{< /eq >}}

- **Strengths:** exact mass conservation, sharp interface, mature and robust.
- **Weaknesses:** curvature and surface tension are noisy, because the curvature
  is computed from the reconstructed interface.

## Level-set

The level-set method advects a signed distance function and computes curvature
smoothly from its gradients.

{{< eq label="2" >}}
\frac{\partial \phi}{\partial t} + \mathbf{u} \cdot \nabla \phi = 0
{{< /eq >}}

- **Strengths:** smooth curvature and surface tension, clean topology changes.
- **Weaknesses:** mass is *not* conserved, so a re-initialisation step is needed.

{{< callout type="method" title="The pragmatic choice" >}}
For confined Taylor bubbles the surface tension is the dominant force, so I use
VOF for the mass conservation and compute the curvature from a smoothed
level-set-like function reconstructed from the volume fraction. The best of both.
{{< /callout >}}

## What decides it

| Question | VOF | Level-set |
| --- | --- | --- |
| Mass conservation | exact | needs correction |
| Curvature quality | noisy | smooth |
| Topology change | handled | handled |
| Thin films | sharp | diffuse |
| Cost | moderate | higher |

## Takeaway

For thin liquid films around a Taylor bubble, the film thickness sets the heat
transfer. VOF resolves that film best, but the surface tension needs the smoother
curvature — which is why the hybrid approach is worth the extra bookkeeping.
