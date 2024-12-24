---
title: Fun Problems in Number Theory
description: Number Theory contains a rich set of interesting problems, some suitable for you or I, some entirely unsolvable. This is a selection of my favorites. 
---

This is a collection of problems from Number Theory. What they all have in common is that the results involve concepts and operations we're all familiar with, so anyone can go "huh, that's a neat fact about numbers!". Regarding difficulty, the "easy" problems should be solvable for anyone, though they may not be that easy. The "medium" problems actually all come from homeworks from early in my undergraduate Number Theory course. They're quite solvable, but may require insights and ideas that are not reasonable to expect from the leyperson. The "hard" problems are quite hard.

<details>
<summary>Jump To</summary>

- [Easy Problems](#easy-problems)
  - [1.1](#11)
  - [1.2](#12)
- [Medium Problems](#medium-problems)
  - [2.1](#21)
    - [Three](#three)
    - [Five](#five)
    - [Nine](#nine)
    - [Eleven](#eleven)
      - [Additional Note](#additional-note)
  - [2.2](#22)
  - [2.3](#23)
  - [2.4](#24)
  - [2.5](#25)
- [Hard Problems](#hard-problems)
  - [Fermat's Last Theorem](#fermats-last-theorem)
  - [Collatz Conjecture](#collatz-conjecture)
  - [Goldbach's Conjecture](#goldbachs-conjecture)

</details>

## Easy Problems

### 1.1

Let $n$ be any natural number, and $s$ the sum of the digits of $n$. Prove that $n - s$ is a multiple of $9$.

For example, if $n = 31$, then $s = 3 + 1 = 4$, and $31 - 4 = 27$, which is a multiple of $9$.

<details>
<summary>Proof</summary>

Let $n = a + 10b + 100c + \dots$. Then $s = a + b + c + \dots$.<br>
Then $n - s = a - a + 10b - b + 100c - c + \dots = 0a + 9b + 99c + \dots$, which is clearly a multiple of 9.
</details>

### 1.2

Prove that a natural number $n$ is prime[^1] if and only if $n$ is not divisible by any prime $p$ with $1 < p \leq \sqrt{n}$.

<details>
<summary>Proof</summary>

Proving $\implies$<br>
This follows directly from the fact that integer primes are irreducible.

Proving $\impliedby$<br>
Clearly if there were such a prime $p$ in range $(1, \sqrt{n}]$, $n$ would not be prime. So then it suffices to show why the range $(\sqrt{n}, n)$ need not be checked.<br>
The largest value that can be produced by a pair in range $(1, \sqrt{n}]$ is $\sqrt{n} \cdot \sqrt{n} = n$.<br>
That means in order for a value greater than $\sqrt{n}$ to be a divisor, so too must there be a value less than $\sqrt{n}$.<br>
So if no such value less than $\sqrt{n}$ exists, no such value greater than $\sqrt{n}$ can exist.
</details>

## Medium Problems

### 2.1

#### Three

A number $n \in \mathbb{Z}$ is divisible by 3 if and only if the sum of the digits of $n$ is divisible by 3.

Proof:<br>
Write $n = a + 10b + 100c + \dots$, where the digits of $n$ are $a, b, c, \dots$.<br>
Since $10 \equiv 1 \pmod{3}$, $n = a + 10b + 100c + \dots \equiv a + b + c + \dots \pmod{3}$.<br>
The proposition follows.

#### Five

A number $n \in \mathbb{Z}$ is divisible by 5 if and only if the rightmost digit is 5 or 0.

<details>
<summary>Proof</summary>

Write $n = a + 10b + 100c + \dots$.<br>
Since $10 \equiv 0 \pmod{5}$, $n = a + 10b + 100c + \dots \equiv a \pmod{5}$.<br>
The only nonnegative integers less than 10 (i.e. that $a$ could be) are 5 or 0.<br>
The propositon follows.
</details>

#### Nine

A number $n \in \mathbb{Z}$ is divisible by 9 if and only if the sum of the digits is.

<details>
<summary>Proof</summary>

Write $n = a + 10b + 100c + \dots$.<br>
Since $10 \equiv 1 \pmod{9}$, $n = a + 10b + 100c + \dots \equiv a + b + c + \dots \pmod{9}$.<br>
The propositon follows.
</details>

#### Eleven

A number $n \in \mathbb{Z}$ is divisible by 11 if and only if the difference between the sum of the digits at even indices and the ones at odd indices are congruent to $0 \pmod{11}$.

<details>
<summary>Proof</summary>

Write $n = a + 10b + 100c + \dots$.<br>
Since $10 \equiv -1 \pmod{11}$, $n = a + 10b + 100c + \dots \equiv -a + b - c + \dots \pmod{11}$.<br>
The propositon follows.

##### Additional Note

*Definition* (Palindrome): let the digits of $n \in \pmod{11}$ be of the form $abc...cba$. Then $n$ is a palindrome.<br>
*Remark*: From the proof above, it follows that all even-length palindromes are divisible by 11.<br>
*Conjecture*: All palindromes divisible by 11 are such that the product of their digits is a perfect square.
</details>

### 2.2

Prove that if $n > 4$ is composite then $n | (n - 1)!$.

<details>
<summary>Proof</summary>

An equivalent statement: if $n > 4$ is composite, then $n$ is a factor of $(n-1)!$.<br>
$n$ is a product of prime factors.<br>
If all such factors are unique in the product, then trivially they are all present in the product $(n-1)!$.<br>
If there are duplicates, they can be thought of as multiplying to unique composite numbers less than $n$, due to the fundamental theorem of arithmetic.<br>
The only time this is not true is for the composite $n = 4$, since $3!$ is divisible by no composite numbers.<br>
Hence, all prime factors of $n$ can be accounted for in $(n-1)!$ when $n > 4$, so $n$ is a factor of $(n-1)!$
</details>

### 2.3

Prove that if a positive integer n is a perfect square, then n cannot be written in the form $4k + 3$ for $k$ an integer.

<details>
<summary>Hint</summary>

Compute the remainder upon division by 4 of each of $(4m)^2$, $(4m + 1)^2$, $(4m + 2)^2$, and $(4m + 3)^2$.
</details>

<details>
<summary>Proof</summary>

Any positive integer of the form $4k+3$ is congruent to $3 (mod 4)$.<br>
If $n$ is even, then $n^2$ is even, and trivially cannot be of the form $4k+3$.<br>
If $n$ is odd, then $n = 2m + 1$, $m \in \mathbb{N}$.<br>
Then $(2m+1)^2 = 4m^2 + 4m + 1$, which is congruent to 3 (mod 4), so cannot be of the form $4k+3$.
</details>

### 2.4

(Follow-up to 2.3)

Prove that no integer in the sequence below is a perfect square.

$11$, $111$, $1111$, $11111$, $\dots$

<details>
<summary>Hint</summary>

$111 \dots 111 = 111 \dots 108 + 3 = 4k+ 3$.
</details>

<details>
<summary>Proof</summary>

Per the hint, all integers in the given sequence are of the form $4k + 3$, and we just showed that no positive integer of that form may be a perfect square, so we are done.
</details>

### 2.5

Prove that if $p$ is a positive integer such that both $p$ and $p^2 + 2$ are prime, then $p = 3$.

<details>
<summary>Proof</summary>

Trivially, 2 does not satisfy the conditons and 3 does.<br>
Now we consider only primes $p > 3$.<br>
Every third integer is a multiple of 3, yet no $p$ is.<br>
So for all $p$, it is either that $3 \mid p + 1$ or $3 \mid p + 2$.<br>
That is, $p \equiv 1 \pmod{3}$ or $p \equiv -1 \pmod{3}$.<br>
In either case, this gives $p^2 \equiv 1 \pmod{3}$, so $p^2 + 2 \equiv 0 \pmod{3}$.<br>
Therefore, for all primes greater than 3, $3 | p^2 + 2$, and $p^2 + 2$ is composite.
</details>

## Hard Problems

### Fermat's Last Theorem

Prove that no triple $a, b, c \in \mathbb{N}$ satisfy the equation $a^n + b^n = c^n$, where $n \in \mathbb{N}$ is greater than $2$.

<details>
<summary>Proof</summary>

I am unable to find a copy of the original proof by Andrew Wiles, but [this source](https://people.math.wisc.edu/~nboston/869.pdf) should be pretty close. Yes, the proof is that long.

Read more about the theorem and its incredible story [here](https://en.wikipedia.org/wiki/Fermat%27s_Last_Theorem).
</details>

### Collatz Conjecture

Consider the following operation on an arbitrary positive integer:

$
f(n) = \left\{
    \begin{array}{lr}
        n / 2, & \text{if } n \equiv 0 \pmod{2}\\
        3n + 1, & \text{if }n \equiv 1 \pmod{2}
    \end{array}
\right\}
$

Prove that for all $n$, this function will eventually return 1.

<details>
<summary>Proof</summary>

There is no known proof of this conjecture. Read more about it [here](https://en.wikipedia.org/wiki/Collatz_conjecture).
</details>

### Goldbach's Conjecture

Prove that every even $n \in \mathbb{N}$ greater than 2 is the sum of two primes.

<details>
<summary>Proof</summary>

There is no known proof to this conjecture. Read more about it [here](https://en.wikipedia.org/wiki/Goldbach%27s_conjecture).
</details>

[^1]: In the integers, a prime $p$ is a positive integer with the property that if $p$ divides $ab$ then $p$ divides $a$ or p divides $b$, where $a$ and $b$ are integers *and* the property that $p$ is only divisible by 1 and $p$ (irreducibility). By the *Fundamental Theorem of Arithmetic*, every integer greater than 1 can be represented uniquely as a product of prime numbers, up to the order of the factors. So primes can be thought of as unique, atomic building blocks wihtin the integers, and each integer is composed of a unique collection of these building blocks. Comfort with this fact can take your number theoretic intuition a long way.
