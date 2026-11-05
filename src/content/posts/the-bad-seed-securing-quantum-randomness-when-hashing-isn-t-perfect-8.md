---
title: 'The Bad Seed: Securing Quantum Randomness When Hashing Isn''t Perfect'
summary: Quantum cryptography extracts near-uniform randomness from imperfect sources
  using hash functions. Standard theory guarantees the *average* output is secure,
  but not that a *specific* hash seed is safe. This paper analyzes rare 'bad seeds,'
  proving the probability of picking one is bounded by the square of the ratio of
  average error to target precision. This result extends to blockwise hashing, providing
  a security guarantee for multiple rounds of extraction even when seeds are reused.
date: '2026-11-05'
track: explainer
video: the-bad-seed-securing-quantum-randomness-when-hashing-isn-t-perfect-8.mp4
---

## In simple terms:
Imagine baking cookies with flour labeled "99% pure." If the 1% impurity is clumped, a scoop from the bad part ruins the batch. Standard quantum rules check the *average* purity of the bag, not your specific scoop. This is the "bad seed" problem. When using a hash function (the scoop) to turn messy quantum data (the flour) into secure random numbers, we need to know the chance of picking a "bad scoop" that leaves data predictable. This research calculates that probability, providing a bound for most practical uses.

![The Bad Scoop Problem](/quantum-frontier/diagrams/the-bad-seed-securing-quantum-randomness-when-hashing-isn-t-perfect-8-simple.svg)

## The science:
In quantum cryptography, an eavesdropper may hold quantum side information about a randomness source. We secure this via randomness extraction using a hash function. The standard tool, the Leftover Hash Lemma, states that the *average* distance to uniformity over all hash seeds is small. However, this average does not guarantee that any *single* seed used in practice is secure. In protocols like Quantum Key Distribution (QKD), seeds are often reused for multiple data blocks. If a specific seed is "bad," the security of those blocks is compromised.

The paper by the authors of arXiv:2611.03484 addresses this gap. They analyze the subset of seeds producing outputs far from uniform. They show that randomness extraction against quantum side information is guaranteed to produce $\delta$-close-to-uniform random numbers with a failure probability bounded by $(\epsilon/\delta)^2$, where $\epsilon$ is the average error bound from the standard lemma. This moves from an average-case guarantee to a high-probability guarantee for individual seeds. Furthermore, this result is generalised to blockwise hashing providing a guarantee of the security of $k$ rounds except with failure probability $((2k-1)\epsilon/\delta)^2$. This allows composable security, ensuring the protocol holds even when the same seed is reused across blocks.

![Failure Probability Bounds](/quantum-frontier/diagrams/the-bad-seed-securing-quantum-randomness-when-hashing-isn-t-perfect-8-science.svg)

## The formula:
The central result bounds the probability that a randomly chosen seed is "bad" (output more than $\delta$ away from uniform). The probability $P_{\text{fail}}$ is bounded by:



$$
P_{\text{fail}} \le \left( \frac{\epsilon}{\delta} \right)^2
$$



For blockwise hashing with $k$ blocks, the bound becomes:



$$
P_{\text{fail}} \le \left( \frac{(2k-1)\epsilon}{\delta} \right)^2
$$



Here, $\epsilon$ is the average statistical distance to uniformity over all seeds. $\delta$ is the target precision (maximum allowable distance). $k$ is the number of blocks. The square indicates failure probability decreases quadratically as $\delta$ increases relative to $\epsilon$.

## A worked example:
Consider a quantum entropy source with average error $\epsilon = 0.01$ and target precision $\delta = 0.1$.

Using the single-seed bound:


$$
P_{\text{fail}} \le \left( \frac{0.01}{0.1} \right)^2 = (0.1)^2 = 0.01
$$


There is a 1% chance a randomly chosen seed is "bad."

Now consider blockwise hashing with $k=10$ blocks. Using the generalized bound:


$$
P_{\text{fail}} \le \left( \frac{(2 \times 10 - 1) \times 0.01}{0.1} \right)^2 = \left( \frac{19 \times 0.01}{0.1} \right)^2 = \left( \frac{0.19}{0.1} \right)^2 = (1.9)^2 = 3.61
$$


A probability cannot exceed 1. This indicates the bound is loose or the parameters are outside the useful regime for these specific illustrative numbers. In realistic cryptographic settings, $\epsilon$ is much smaller. Let us adjust to $\epsilon = 0.001$ and $\delta = 0.1$.

For $k=10$:


$$
P_{\text{fail}} \le \left( \frac{19 \times 0.001}{0.1} \right)^2 = \left( \frac{0.019}{0.1} \right)^2 = (0.19)^2 = 0.0361
$$


With an average error of 0.001, the probability that the reused seed fails for 10 blocks is bounded by 3.61%. This shows how $k$ impacts security and why keeping $\epsilon$ small is crucial for multi-round protocols. These numbers are illustrative.

## Why it matters:
This work bridges theoretical security guarantees and practical implementations. By providing rigorous bounds on "bad seeds," it allows engineers to design protocols secure even when seeds are reused. This is critical for QKD and other quantum cryptographic protocols relying on privacy amplification. Generalizing to blockwise hashing means protocol security can be composed from individual blocks without assuming a fresh seed for every block.

## Sources

- [On the Failure Probability of Quantum Leftover Hashing with Bad Seeds](https://arxiv.org/abs/2611.03484)
