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

## Example chain

See the example PDF Q&A chain in the `chains` folder. It features in-flight vector search to intelligently populate LLM context.
