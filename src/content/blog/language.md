---
title: Topics in Language and Meaning
description: This post is a crash course on the introductory topics in the Philosophy of Language and Meaning. If you're a natural language speaker, then in a sense, you're already an expert on these topics!
date: 2021-04-04T05:00:00Z
categories: [philosophy]
author: Reed Nelson
tags: [language]
complexity: 1.2
draft: false
---

This post is sort of a crash course on some of the introductory topics in the Philosophy of Language and Meaning. We will cover five big topics, which are only are loosely connected. If there exists some general theory of language and meaning which unifies all of these ideas, I know nothing of it.

As a natural languuage speaker yourself, your thoughts on this topic are probably valid. As we go, I encourage you to move slowly and think about what *you* believe.

## Descriptions and Reference

### [Sense and Reference](http://www.scu.edu.tw/philos/98class/Peng/05.pdf) ([Gottlob Frege](https://plato.stanford.edu/entries/frege/))

A **sign** is a proper name which refers to a definite object.
A **sense** is the mode of presentation of a sign. For every sense there is at most 1 referent, a term may have a sense but no referent.
A **referent** is the thing a sign refers to.

For example, “Venus” and “the second planet from the sun” are two different senses which share a referent.

Intuitively, the referent seems like the important part of the sense/referent pair, i.e. the one with all the meaning. If that is true, then “Venus” and “the second planet from the sun” have the same meaning. And if two statements have the same meaning, it seems like they should be completely interchangeable in a sentence. Now consider this: does “Venus is Venus” have the same meaning as “Venus is the second planet from the sun”? Certainly not! The former is a tautology, but the latter tells you something about Venus that you might not have known. In this case we have two senses for the same referent, but these senses aren't merely pointers, they seem to (have the potential to) mean more than just the thing they concretely refer to.

Question: what is the meaning of “the King of France is bald”? Frege would say that because there is no real world present king of France, the sentence has no truth value. Likewise, he will say "Harry Potter is a Wizard” is not truth-apt because as far as the real world is concerned, there is no Harry Potter who could be a wizard.

Some of what Frege has to say may seem a bit simplistic and incorrect, but he was one of the earliest thinkers to study the philosophy of language as it's understood today.

### Presuppositions ([Galen Strawson](https://en.wikipedia.org/wiki/Galen_Strawson))

Strawson didn’t use the term "presupposition", but he’s thought to have originally come up with this linguistic phenomenon. A term or phrase **presupposes** that $P$ if it doesn’t directly state that $P$, but in some sense the speakers using the term takes for granted that $P$. We might say “the king of France is bald” implies that there is a king of France. Similarly, replying “no” to “have you quit smoking?” seems to imply that you are still a smoker, even if you’ve never smoked.

## Proper Names

A **proper name** is a name used for an individual person, place, or organization, i.e. George Washington, Venus, The Lord of the Rings. A non-example would be: the first president of the United States.

Consider this argument that names have meaning beyond what they refer to:

1. If the meaning of a name is *just* the thing it refers to, then two names that refer to the same thing have the same meaning.
2. If two names that refer to the same thing have the same meaning, then whenever $a$ and $b$ are two names that refer to the same thing, $a = b$ is analytic[^1]. (We made this assumption earlier when discussing Frege).
3. It is false that whenever $a$ and $b$ are two names that refer to the same thing, $a = b$ is analytic.
4. Therefore, the meaning of a name is not just the thing it refers to.

### [Description Theory](http://michaeljohnsonphilosophy.com/wp-content/uploads/2015/08/John-Searle-Proper-Names.pdf) ([John Searle](https://en.wikipedia.org/wiki/John_Searle))

Frege, [Bertrand Russell](https://plato.stanford.edu/entries/russell/), and Searle all subscribe to some form of **description theory** of proper names, which states that the meaning of a name is *not* just what it refers to. Rather, a name is synonymous with a description or cluster of descriptions. In Frege and Russell's case, they think there is a single property or set of properties which give a name its meaning. For example, it would seem to be a combination of properties that make what we call "the moon", the moon: it's important that it's a big rock, but also that it's relatively close to the earth, orbits us as it does, and so on.

To Searle, Frege and Russell's theory is a little too rigid. He points out a problem: suppose “Aristotle” and “the teacher of Alexander the Great” have the same meaning. Then that identity is analytic. But surely it’s synthetic! It could have been that Aristotle never taught Alexander, and it seems like Aristotle would still be Aristotle. That is, there's more to our understanding of Aristotle that merely that he taught Alexander.

The **cluster theory** states that the meaning of a name is a cluster of the properties commonly associated with it. If a thing in the world has a sufficient number of the properties associated with a name, then that thing in the world is the referent of the name.

We can list out some properties of Aristotle: student of Plato; teacher of Al; author of the Nicomachean Ethics; author of the Prior Analytics; the greatest philosopher born in Stagira, etc. There is no single property $P$ such that “Aristotle is $P$” is analytic, and if Aristotle didn’t have one of these properties, we wouldn’t say Aristotle didn’t exist, we’d say oh, Aristotle wasn’t born in Stagira. If it turned out that there was no such person with most of these properties, only then would say that Aristotle didn’t exist.

Saul Kripke has a bone to pick with the Cluster theory. He points out that a speaker can refer to something even if they don’t know any uniquely identifying propertied of that thing. i.e. you might recognise that Feynman and Maxwell were physicists but know nothing else about them. This is a problem if you believe that a name is synonymous with a group of descriptions, because that account would make it seem like you think Feynman and Maxwell are two names for the same person. A possible response to this problem might be to say the name is part of the description, but then you get this weird sort of circular thing going on.

### [Naming and Necessity](http://people.exeter.ac.uk/sp344/naming_and_necessityocr.pdf) ([Saul Kripke](https://en.wikipedia.org/wiki/Saul_Kripke))

Kripke diverges from the descriptivists, instead opting for a *theory of reference* (which is just a theory of how a term gets its referent). A motivating example for this is the Paris meter stick. Back in 1875, some scientists made a perfect meter stick out of platinum and iridium, which officially defined the meter. But despite the care they took in their choice of alloy, some atoms were still falling off or something, and the stick was very slowly getting shorter. So then in 1960 they redefined the meter as some number of wavelengths of something, and then in the 80s it was redefined again to be the distance traveled by light in a vacuum in $\frac{1}{299,792,458}$ of a second[^2]. Anyway, Kripke points out that on some level, this all feels kind of silly. A meter is just a meter. It seems like we don’t want to change our concept just because some “official” stick is its technical definition.

A **rigid designator** is a term or phrase that designates the same object in all possible worlds. This doesn’t mean that the term couldn’t have had a different meaning. Rather, it means that given the meaning the term has, it designates the same object with respect to all possible circumstances. Kripke argues that unlike descriptions, names are rigid designators. We can imagine a counterfactual situation in which someone else was the first president of the US, but it doesn’t really make sense to say someone else could have been George Washigton.

Kripke’s positive account of how a reference is determined is called a **causal view of reference**, which states that at some point, a name gets assigned to an object, and then that name just refers to the object. From then on, the name gets passed from speaker to speaker, and we can trace a causal chain from our use of a word back to its origin. This implies that reference is not mediated by description.

## Propositional Attitudes

We'll shift gears now, into a bit more of an epistemological topic. Consider **the Principle of Translation**: “If a sentence of one language expresses a truth in that language, then any translation of it into any other language also expresses a truth (in that other language)". This seems like a pretty reasonable idea, but Kripke will reveal a problem.

### [A Puzzle About Belief](https://www.uvm.edu/~lderosse/courses/lang/Kripke(1979).pdf) ([Saul Kripke](https://en.wikipedia.org/wiki/Saul_Kripke))

In France there is a French boy, Pierre, who grows up speaking only French. As a child, he reads about the city “Londres” (London), and develops the belief that “Londres est jolie” (“London is pretty”). Pierre moves to London, learns English, and through personal experience, develops the belief that “London is not pretty”. So if, in the present, you asked Pierre "Is London pretty?", he would report "No, London is not pretty". However if you asked him "Est-ce que Londres est jolie?" ("Is London Pretty?"), he would reply "Oui, Londres est jolie". So the puzzle is, does Pierre believe that London is pretty? And does he believe that London is *not* pretty? There are 4 permutations, each with different implications.

1. Pierre **believes** that London is pretty and **believes** that London is not pretty.
The glaring problem with this option is that it implies Pierre believes a contradiction, but we can assume Pierre is a rational guy who would not wittingly believe two conflicting thoughts.

2. Pierre **believes** that London is pretty and **does not believe** that London is not pretty.
If we take this to be the case, then we're ignoring Pierre's experience-based report in english that "London is not pretty", and that seems plainly wrong.

3. Pierre **does not believe** that London is pretty and **believes** that London is not pretty.
For this case to be correct, you have to disconnect Londres from Pierre's childhood book, from London, the real city. The issue here is we're implying that the city discussed in the book does not map to the real city, even though it's discussing that city, and stating facts about it. And why? Because "Londres" $\neq$ "London"?

4. Pierre **does not believe** that London is pretty and **does not believe** that London is not pretty.
This has the same problem that (2) has.

There's much more discussion to be had about this puzzle and these permutations. Perhaps *you* can find a good solution.

### [Quantifiers and Propositional Attitudes](https://www.uvm.edu/~lderosse/courses/lang/Quine(1956).pdf) ([W. V. O. Quine](https://plato.stanford.edu/entries/quine/))

According to Quine, Pierre’s case is one of **double vision**, where two apparently distinct objects are in fact one. Quine’s solution is to give up the idea of belief as a relation to objects and propositions. Rather, belief is merely a relation to sentences. So it’s not a question of “does Pierre believe London is pretty?” It’s a question of “does Pierre believe ‘London is pretty’?”

This idea is pretty radical. It provides a simple solution to Pierre's case, but its implication about belief in general is very odd. When I believe something, if feels like I believe that thing directly, not that I believe it because I would assent to a statement that that belief is true.

## Context Sensitivity

### [Demonstratives](https://www.asc.ohio-state.edu/roberts.21/NYU/Kaplan.demonstratives.pdf) ([David Kaplan](https://en.wikipedia.org/wiki/David_Kaplan_(philosopher)))

Indexicals and demonstratives are terms whose referent is determined by the context of utterance, and whose meaning provides a rule that determines the referent based on certain aspects of the context.

**Indexicals** get their referent from the context, (i.e. I, you, today, tomorrow, here). **Demonstratives** can be thought of as a subset of indexicals which tend to need an adjoining demonstration, even if not in every instance of use, (i.e. this, that, she).

The *character* of a sentence is the agent involved in the sentence. The *context* of use is the time and place of the speaker of the sentence. The *circumstance of evaluation* is the time and place within the sentence. “I” seems to refer to myself in the context of use, not in the circumstance of evaluation. For examaple, “I was just talking to my friend in India, who was at a bar”, seems to mean something like “I was just on the phone with my friend, who was at a bar in India”, not “I was just in India talking to my friend who was at a bar” nor “I was just talking to my friend in India who was at a bar in Madison”. The same is true for words like “you”.

*Content* is what is expressed by an expression in a context of use. Both individual expressions and sentences have contents. The content of an indexical is just it’s referent, because given a context, indexicals are directly referential. But that content will vary from context to context in a consistent way. For example, the character of “I” is the speaker in the context of utterance, but within a context, the content is just some individual. Likewise, the character of “today” is the day of the context of utterance.

Example: “I am at my desk writing about language”.

- Character: the person writing about language at their desk
- Content: Reed is at his desk writing about language
- Context: when/where you're reading this
- Circumstance: When I wrote that sentence.

Admittedly this is a little weird to think about via blog. If you'd like, you can imaging you and I sitting down and discussing language over tea, and work out the four C's in that situation.

### [Predicates of Taste](https://www.researchgate.net/publication/214750304_Context_Dependence_Disagreement_and_Predicates_of_Personal_Taste) ([Peter Lasersohn](https://publish.illinois.edu/lasersohn/))

“I am standing” has no truth value without context, but in the context of a particular person being “I”, it can be said to be true or false.

Question: what's your precise interpretation of the statement “Birds fly”?

Generally, I think the intuition is to say this is true. Does that implicitly say “most birds fly”? A counterexample would be “books are paperbacks”. To me this seems false, even though most books in the world are, in fact, paperbacks. This might be because being specifically a paperback doesn’t seem like an especially bookish quality. We could go in the opposite direction with the phrase “mosquitos carry the West Nile virus”. Here, I'd tend to agree with this statement even though it's only true of a small fraction of mosquitos.

**Predicates of taste** are expressions about personal taste (i.e “fun”, “tasty”, ...). What do these mean? Are they truth apt?

The *Quantificational* approach: “roller coasters are fun” = “all roller coasters are fun” or “most roller coasters are fun” or “some roller coaster is fun”. A problem with this interpretation is that I could reasonably say roller coasters are fun even if I know that most people don’t like roller coasters.

The *Expressivist* approach: “this pasta is tasty” = “yum”. That is, predicates of taste are not truth-apt. But consider the following. The exchange Alex: *“That was fun”, Rishi: “that’s true”* is a legitimate conversation, but *Alex: “boo”, Rishi: “that’s true”*, is not. So it looks like predictes of taste cannot (always) be taken as non-truth-apt.

Another approach: “this pasta is tasty” = “I think this pasta is tasty”. The issue here is that people do have real disagreements about matters like this, though when we contest such a statement, we're not usually calling the other person a liar.

## Pragmatics

What we’ve mostly seen so far has been *semantics*, which is concerned with what words mean. *Pragmatics*, which we’re moving into, is about how language is used.

### [Performative Utterances](https://www.uvm.edu/~lderosse/courses/lang/Austin(1979).pdf) ([J. L. Austin](https://plato.stanford.edu/entries/austin-jl/))

**Performative utterances** are utterances which are themselves the action they speak of[^3]. For example, “I apologize”,  “I bet you $5 that…”, “Speed Limit: 55 mph”.

These are not reports on the world, so they can't really be true or false, but they can be successful or unsuccessful. For example, “I do” only succeeds in marrying someone when certain social/legal conditions are met. Furthermore, certain performative utterances can only be made by people with certain authority. “I declare you husband and wife” cannot succeed in marrying a couple if the speaker is not a wedding officiant.

What about internal feelings? If I say “I congratulate you” but do not really feel the adjoining “admiration”, have I succeeded?

### [Logic and Conversation](https://www.ucl.ac.uk/ls/studypacks/Grice-Logic.pdf) ([H. P. Grice](https://plato.stanford.edu/entries/grice/))

The **Cooperative Principle**: “Make your conversational contribution such as is required, at the stage at which it occurs, by the accepted purpose or direction of the talk exchange in which you are engaged.”[^4] In particular, follow these four maxims:

- *Quantity*: Make your contribution no more or less informative than required.
- *Quality*: Do not say what you believe to be false, or lack adequate evidence for.
- *Relation*: Be relevant.
- *Manner*: Avoid obscurity, ambiguity, excess wordiness, etc. (Be clear).
  
There are four ways to fail to satisfy the cooperative principle:

- Quietly violate them, not drawing attention to this fact.
- Explicitly opt out (e.g. “My lips are sealed”).
- Face a clash between maxims.
- Disobey a maxim such that others are intended to be able to discern that.

Generally we interpret other speakers as following these maxims, but even if we feel someone is violating one or several of them, we want to interpret them as still obeying the cooperative principle. This sort of disparity can lead to *implicature*. **Implicature** is something the speaker suggests or implies with an utterance, even though it’s not literally expressed. Take a few examples:

- The speaker’s utterance only obeys the maxims if some information beyond what was literally said is communicated. e.g. A: “Tommy doesn’t seem to have a boyfriend these days.” B: “She has been spending a lot of time at the Sigma Chi house lately.”

- The speaker must violate one maxim to obey another. e.g. A: “What state is Harrison from?”  B: “A New England one.” (Violates quantity in order to satisfy quality)

- The speaker violates a maxim with the intention of communicating some other information. e.g. [A reference letter] “To whom it concerns, Philip’s command of English is excellent, and his attendance at work has been regular.”

---

[^1]: We call a truth **analytic** if the fact that it’s true follows from the meaning of the terms, and we call it **synthetic** if not. To use the classic example, the sentence "bachelors are unmarried men" is analytic, this is what it means to be a bachelor. The sentence "Karl is a bachelor" is synthetic. Karl could be married or unmarried, you'd have to know more about him to say. This distinction first discussed by Kant captures something similar to the *a priori*/*a posteriori* distinction, but isn't quite the same.
[^2]: From the Wikipedia page on the [Meter](https://en.wikipedia.org/wiki/Metre).
[^3]: Austin apparently invented the word “performative”, though today the colloquial use seems to be sort of the opposite of his.
[^4]: You have become the very thing you swore to destroy.
