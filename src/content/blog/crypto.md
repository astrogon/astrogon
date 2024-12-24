---
title: Cryptography
description: none
date: 2022-08-30T05:00:00Z
categories: [computer-science]
author: Reed Nelson
tags: [cryptography]
complexity: 1
draft: true
---

Cryptography is used everywhere in ciberspace, by everybody, all the time.

Think about how much of your information is personal, confidential. That is, information where it matters that it didn't come from just anybody, or you wouldn't want just anyone knowing it. These aren't just your passwords and credit card numbers: how would you feel if a stranger came up to you off the street and asked for your children's names, what your most recent purchases were?

In real life we can intuit about vulnerabilites, and so can everyone else (there's a sort of herd protection in this). Further, malicious parties are constrained by the singularity of their physical presence, and limitations of movement. In the physical world we can whisper our secrets and look around to see in anyone's in earshot. None of these things are true in ciberspace.

Encryption is necessary not only when you log in, but almost any time you're transmitting data, because it almost always matters that the data came from you. And it matters that not just anyone can access it or modify it before it arrives at its destination.

Whenever you download software, you need to check its integrity. The same is true when you send data to or from the cloud, or from your phone to your airpods, or when you call, text, etc. In communication of every kind, it's important to make sure the data that was sent is the data that was recieved, and a surprising amount of the time, it isn't.

Understanding computer systems is hard, and understanding math is even harder. So most of the time, all of these processes are abstracted away, or otherwise hidden from the end user. It is very easy to be ignorant of just how essential Cryptography is. But in reality, without all of these features provided by Cryptograohy, the internet could fall apart, along with many other digital systems (key fobs, credit cards...). None of these functions are safe without cryptography.

## Encryption

Symmetric encryption is much older, more conventional, and better known type of encryption.

Perhaps the most dominant symmetric encryption scheme is AES, ...

Asymetric, or public-key encryption was only discovered in the 1970's. In asymmetric systems, ...

Asymmetric encryption tends to be slower. Additonally, the security of these these systems is highly confident but uncertain. That is, mathematicians think that no efficient inverse function exists, but nobody has proven it. For these reasons, Asymmetric encryption is mostly only used where necessary, which is still a lot, but usually for small amounts of data.

It shouldn't be understated how awesome asymmetric encryption really is. For a long time it was believed to be impossible...[Quote from DH paper].

Symmetric and asymmetric encryption harmonize beautifully. Where symmetric is fast and provably secure, asymmetric solves the glaring issue of exchanging keys over insecure channels. The digital world would look very different without asymmetric encryption.

RSA/Elliptic curve

### Key Exchange

## Compression

## Data Integrity

Check digits

Hash functions

MAC

Digital Signatures

Use cases:

- mistakes in input, data corruption in transport or storage
- manipiulation of data: changing after certification, falsifying sender...
