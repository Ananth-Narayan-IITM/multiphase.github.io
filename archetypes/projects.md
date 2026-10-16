---
title: "{{ replace .File.ContentBaseName `-` ` ` | title }}"
date: {{ .Date }}
draft: false
weight: 100
featured: false
category: "CFP"
summary: "One-sentence summary shown on the project card."
cover: "img/cover-cfp.jpg"
role: "Your role"
status: "Ongoing"
statusTone: "ongoing"
tags: ["CFP"]
tools: ["OpenFOAM"]
metrics:
  - { value: "0", label: "placeholder metric" }
math: false
toc: true
---

## Overview

Describe the problem and why it matters.

## Method

Describe the model, the discretisation and the solver.

{{< callout type="method" title="Key idea" >}}
The one thing a reader should take away.
{{< /callout >}}

## Results

{{< figure src="/img/gallery/velocity-contour.jpg" caption="Replace with your figure." >}}

## Impact

What changed because of this work.
