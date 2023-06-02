/**
 * This sample chain allows users to ask questions of a PDF
 */

import { defineChain } from "@relevanceai/chain";

/**
 * Files in this folder must export a chain definition
 */
export default defineChain({
  title: 'PDF Q&A',
  description: 'Ask questions of a PDF',

  /** Must be set if you want to run this chain client side */
  publiclyTriggerable: true, 

  /** Set the inputs for this chain */
  params: {
    pdfUrl: {
      type: 'string',
      /** This optional metadata is used for the UI in our deployed form */
      metadata: {
        content_type: 'file_url' // makes this input render as a file upload component
      }
    },
    question: {
      type: 'string',
    }
  },

  /** Declare the steps in your chain */
  setup({ params, step }) {

    const { pdfUrl, question } = params;

    // Convert PDF URL into text
    const { text: pdfText } = step('pdf_to_text', { pdf_url: pdfUrl, use_ocr: true });

    // Chunk PDF text
    const { chunks } = step('split_text', { text: pdfText, method: 'tokens', num_tokens: 250 })

    // Retrieve most relevant chunks with in-flight vector search
    const { results: context } = step('search_array', { array: chunks, query: question, page_size: 3 });

    const { answer } = step('prompt_completion', {
      prompt: `CONTEXT: ${context}. QUESTION: ${question}.`,
      system_prompt: 'You are an expert PDF reader. You are asked a question about the PDF. You answer the question. Return two answers: long_answer and short_answer. short_answer should be a one sentence summary of the long_answer. Return in JSON and nothing else, in the form { long_answer, short_answer }',
      validators: [
        {
          _oneof_type_: 'jsonschema',
          schema: {
            type: 'object',
            properties: {
              long_answer: { type: 'string' },
              short_answer: { type: 'string' }
            }
          }
        }
      ]
    });

    /** Your chain must return an object */
    return {
      answer
    };
  }
});