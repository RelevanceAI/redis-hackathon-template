# Typescript SDK for building & deploying LLM chains

Read the [documentation](https://documentation.relevanceai.com/introduction).

Our SDK works hand in hand with our Notebook UI, where you can easily debug your chains after running `relevance deploy`.

## Get started

Start by installing our CLI:

```
npm install @relevanceai/chain -g
```

Then authenticate and fill in the project, region and API key:

```
relevance login
```

Then deploy your chains:

```
relevance deploy
```

## Searching Redis index

We have a "step" for vector searching Redis! See [the documentation](https://documentation.relevanceai.com/reference/transformation-steps#vector-search-redis).

## Example chain

See the example PDF Q&A chain in the `chains` folder. It features in-flight vector search to intelligently populate LLM context.
