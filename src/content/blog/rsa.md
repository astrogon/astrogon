---
title: RSA Encryption
description: You use the RSA encryption scheme every day. It's simple enough to understand, but quite powerful. In this post, we discuss the basics of ciphersystems, public key encryption, and why RSA works so well.
date: 2022-06-10T05:00:00Z
categories: [computer-science]
author: Reed Nelson
tags: [math, cryptography]
complexity: 1.5
draft: false
---

Encryption is all about encoding information with the end of limiting (meaningful) access to it. Usually when we're talking about encryption/decryption, it's in the context of an outgoing/incoming message. You use encryption dozens or hundreds of times a day without ever having to think about it. Every credit card swipe, every iMessage, every HTTPS visit, and every packet sent to your wireless headphones is encrypted. Anyone intercepting your data while it's in motion is only reading garbage (so long as they can't decrypt it).

RSA is an encryption algorithm developed at MIT in the 70's[^1] by researchers Rivest, Shamir, and Adleman (hence, RSA). It's simple enough to understand, but it's very secure. Despite its age, RSA remains one of the most widely used public-key encryption schemes. "Public-key" isn't some throwaway phrase, it's integral to the description of RSA, and it describes a very significant class of ciphersystems in Cryptography. To build context for this concept and for RSA, we'll first look at a more traditional class of systems.

### A Bit About Modular Arithmetic

The modulus operator returns the remainder of an integer division. For example, $5 \text{ mod } 3 = 2$. Equivalently, we say $5 \equiv 2 \,(\text{mod } 3)$, "five is congruent to two, mod three". $\mathbb{Z}$ denotes the set of integers, and $\mathbb{Z}_n$ denotes the set of integers modulo $n$, i.e. $\{0, 1, 2, ..., n-1\}$.

## Traditional Cipher Systems

A **cipher system** $(P, C, K, e, d)$ is defined with the following components:

$P =$ a set of plaintexts $\\$
$C =$ a set of ciphertexts $\\$
$K =$ a set of keys $\\$
$e:\, P \to C =$ an encryption function $\\$
$d:\, C \to P =$ a decryption function

The role of all these pieces will be apparent with a simple example:

### The Shift Cipher

$P = C = K = \mathbb{Z}_{26}\\$
$e_k(x) = x + k \,(\text{mod } 26)\\$
$d_k(y) = x - k \,(\text{mod } 26)$

What this means is we're working with a $26$ character alphabet (i.e. $A, ..., Z$), where each character is mapped to a number (i.e. $A = 0, ..., Z = 25$). Then if we choose the key to be $3$, we have $e_3(A) = D, e_3(B) = E, ..., e_3(Z) = B$. So all we've done is shifted (rotated) each character in our message by $3$ characters. $k$ can be any integer from $0$ through $25$ ($26 \equiv 0 \,(\text{mod } 26)$). When $k = 3$ specifically, this is called the Caesar cipher.

## RSA

RSA is a public key ciphersystem, which means that everyone can know how to encrypt a message, but the encryption key is not sufficient to decrypt the message. So the encryption function is still invertible (otherwise there would be no way to decrypt), but it is hard to find the inverse of the encryption function. A function like this is called a [**one-way function**](https://en.wikipedia.org/wiki/One-way_function)[^2], or a trapdoor function. By "hard" to decrypt, we mean something like "a modern computer could run until the universe burns out and still have almost no chance of decrypting".

RSA leverages this fact to create its one-way functions: it is relatively easy to compute very large prime numbers, but very difficult to find the prime factors of large numbers.

Let $p$ and $q$ be two large primes, and $n = p \cdot q$. Then take $e$ and $d$ in $\mathbb{Z}_{(p-1)(q-1)}$, such that $e \cdot d \equiv 1 \,(\text{mod } 26)$. That is, $e$ and $d$ are inverses in $\mathbb{Z}_{(p-1)(q-1)}$. At this point we can throw out everything but $e$, $d$, and $n$. we no longer need them and their discovery would break the security of our scheme. Now we can share $(e, n)$ publicly, and must keep $d$ secret. The encryption for a message $M$ is $M^e \,(\text{mod } n)$, and the decryption is $(M^e)^d \,(\text{mod } n)$. It's as simple as that.

It's not obvious at all that $M^{e \cdot d} \equiv M \,(\text{mod } p \cdot q)$ when $e \cdot d \equiv 1 \,(\text{mod } (p-1)(q-1))$, but this fact is essential for RSA to work as it does. I'll prove this statement below in case you're interested.

I've already mentioned that RSA is widely used today, but in particular many RSA systems use a $2048$ bit (~$600$ digit) "$n$" value, and an "$e$" value of precisely $65,537$. If you like your powers of two, you may recognize this as $2^{16}+1$[^3]. For a sense of scale, the number of atoms in the universe has about $80$ digits. The numbers we're working with here are truly massive, so this may raise a couple concerns for you.

First, isn't it difficult to find prime numbers that large to use for $p$ and $q$?

Prime numbers aren't as scarce for $n$ in our ballpark as you may think. By the [Prime Number Theorem](https://en.wikipedia.org/wiki/Prime_number_theorem), there are approximately $\frac{n}{\ln(n)}$ primes in the first $n$ natural numbers. So in pratice, it's reasonable to iteratively take numbers in some ballpark and do a [primality test](https://en.wikipedia.org/wiki/Primality_test). Naively, all you'd have to do is check if any prime between $2$ and $\sqrt{n}$ divides $n$. So clearly this can be done much faster than finding the prime factors in general (which we said earlier was hard).

Second, isn't it difficult to reduce such huge exponents to encrypt and decrypt messages?

Not really! Since we're doing modular exponentiation, we can be super efficient. Let's do an example. Say we want to encrypt the letter "X" ($23^{rd}$ letter) with the key $e = 25$ in $\mathbb{Z}_{26}$. We want to know $23^{25} \,(\text{mod } 26)$. Computing directly gives $23^{25} = 11,045,767,571,919,545,466,173,812,409,689,943$. But that took a ton of sub-operations, and we have to do a ton more to find this value mod $26$. By leveraging the fact we're working in $\mathbb{Z}_{26}$, we can reduce this to order $O(\log(n))$ operations. $23^{25} = (23^{12})^2 \cdot 23 = ((23^6)^2)^2 \cdot 23 = (((23^3)^2)^2)^2 \cdot 23 = (((23 \cdot 23^2)^2)^2)^2 \cdot 23$. $23^2 \,(\text{mod } 26) = 529 \,(\text{mod } 26) \equiv 9$. $23 \cdot 9 \,(\text{mod } 26) = 207 \,(\text{mod } 26) \equiv 25$. Now we have $(((25)^2)^2)^2$. Almost there! $25^2 = 625 \equiv 1$, and of course $1$ to any power is $1$. So $23^{25} \equiv 1 \,(\text{mod } 26)$.
TLDR: by finding modular equivalences in intermediate steps, we're able to keep the size of our multiplications in a reasonable range.

## Closing Remarks

So that is RSA, and why it works. This is truly an awesome system. There's some interesting history here with RSA and the [Diffie-Hellman Key Exchange](https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange) and their treatment by certain global superpowers, but I will save the culture for another post.

---

### Proof that $\forall x \in \mathbb{Z}_{pq},\, x^{ed} \equiv x$

Fermat's Little Theorem[^4]: if $p$ is prime, then $x^p \equiv x \,(\text{mod } p)$.$\\$
By construction, $ed \equiv 1 \text{ mod } (p-1)(q-1)$, so $(ed-1)$ is a multiple of $(p-1)(q-1)$.$\\$
That is, $\exists k \in \mathbb{Z}:\, ed-1 = k(p-1)$.$\\$
Then $(x^e)^d = x^{ed} = x \cdot x^{ed-1} = x \cdot x^{k(p-1)} = x \cdot (x^p)^k \cdot x^{-k}$.$\\$
By Fermat's Little Theorem, $x^p \equiv x \,(\text{mod } p)$, so $x \cdot (x^p)^k \cdot x^{-k} \equiv x \cdot x^k \cdot x^{-k} \equiv x \,(\text{mod } p)$.$\\$
By symmetry, $(x^e)^d \equiv x \,(\text{mod } q)$.$\\$
So we have $\forall x \in \mathbb{Z}_n, x^{ed} \equiv x \,(\text{mod } pq)$.

---

[^1]: An equivalent system was developed secretly and used by the British government years before Rivest, Shamir, and Adleman devised RSA!
[^2]: The existence of one-way functions is actually only a conjecture! To prove OWFs exist is to prove $P \neq NP$. That is to say, RSA's security depends on a very big (but probably safe) assumption.
[^3]: [Numberphile](https://www.youtube.com/c/numberphile) has several RSA-related videos. [This one](https://youtu.be/cbGB__V8MNk) explains why $2^{16}+1$ is a pretty good choice of $e$.
[^4]: The second coolest theorem with a name of the form "Fermat's L___ Theorem".
