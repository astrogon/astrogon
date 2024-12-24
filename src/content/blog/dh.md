---
title: Diffie Hellman
description: none
date: 2022-07-10T05:00:00Z
categories: [computer-science]
author: Reed Nelson
tags: [math, cryptography]
complexity: 1
draft: true
---
<!-- 
- What is the Diffie Hellman Key Exchange?
  - Under normal circumstances, when we want to sent a private message over a public channel, we encrypt the message using an encryption function-key pair, where the function is common knowledge, but the key, which is needed to both encrypt and decrypt the data, is kept secret. So then if we want to send  information to another party (say credic card information to an online store), both we and the other party must know the key. Of course, if just anyone knows the key, then they will be able to intercept the encrypted message in transit, and decrypt it. (We generally assume everyone knows our encryption function already).
  - Diffie Hellman is a way for two parties (who may never have interracted before) to share a secret key over a public channel. This should sound like magic.
- how does it work
  - The Setup
    - For the remainder of this post, we will take ourselves to be "Alice", and the party we wish to communicate wiht to be "Bob". For our key exchange to work, both Alice and Bob will need a value ($a$ and $b$, respectively), which we keep totally secret, even from each other.
  - The trick, or whatever 
- Vulnerability with DH: the Man in the Middle
  - Diffie Hellman works great on its own as long as you can trust that no third party is tampering with your messages. But in the real world, this is rarely a safe assumption. I invite you to imagine what could go wrong if an adversarial figure, able to intercept your messages and impersonate you, were present among your DH key exchange.
 - The problem is this: Imagine you're Alice seeking to share a key with Bob, and Dana is our malicious man in the middle. You send out the message $g^a$. Unbenounced to you, Dana intercepts this message, blocking it from getting to Bob. Dana then replies to you with $g^d$, but she impersonates Bob, so you take this to be $g^b$. Now you think you have established a shared key with Bob, but in fact the shared key is with Dana ($g^{ad}$). Dana now sends $g^d$ to Bob, but she impersonates you, so Bob takes this to be $g^a$. Bob then replies with $g^b$, so now Dana and Bob share the key $g^{bd}$. Now, Dana has full control over the communication between you and Bob. She can understand it all, and modify it at will. All of this without you having any indication your key exchange (or subsequent messages) were tampered with. Diffie Hellman alone simply has no response to this problem.
- The solution to the Man in the Middle problem
  - Enter RSA (or any asymmetric encryption scheme). The setup is the same, except this time, Bob has the power of RSA[^1] in his tool box.

## Culture

- GCHQ making not one but two of the most significant discoveries in cryptography years before academics did publicly.
- The US government literally treating cryptographic schemes as "munitions" for decades. Everything cryptography (double check this) was under the purview of the NSA.
- Once apon a time (until the 90's) a few governments held all the cards to secure communication.

---

[^0] Whitfield Diffie and Martin Hellman: [*New Directions in Cryptography*](https://ee.stanford.edu/~hellman/publications/24.pdf).
[^2]: [Computerphile](https://www.youtube.com/c/computerphile) has several Diffie-Hellman-related videos.
[^1]: Understanding asymmetric encryption is critical to the solution to this problem. RSA is one of the most important schemes of this kind, and an explanation of both can be found in [this post](/rsa).
 -->