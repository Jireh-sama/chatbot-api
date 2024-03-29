const { green, yellow } = require('colorette');
const { insertData } = require('../../firebase/firebase-config');
const { readJSONFile, updateJSONFile } = require("../../jsonReader");
const matchQuestionToObject = require('./objectMatcher');

/* 
  * This fn finds the origin object from the knowledge base 
  * and get that value to store or update the frequency file.
  */
const updateFrequency = (searchValue) => {
  try {
    if (!searchValue) {
      throw new Error('Search value does not exist');
    }
    const knowledgeFilePaths = [
      './knowledge/greetings_data.json',
      './knowledge/questions_data.json'
    ]
    const foundObject = matchQuestionToObject(searchValue, knowledgeFilePaths);
    if (!foundObject) {
      console.log("Unable to update Frequency Object not found");
      return;
    }
    const jsonFAQFilePath = "question_frequency.json";
    let newData = {};
    newData = {
      questions: [...foundObject.documents],
      answer: foundObject.answer,
      frequency: 1,
    };
    updateJSONFile(jsonFAQFilePath, newData);
    console.log(green("✅ Frequency has been updated"));
    // insertFAQsToDatabase();
  } catch (error) {
    console.log('An error occured', error.message);
  }
  
};

const insertFAQsToDatabase = () => {
  const top5Questions = getHighestFrequency();
  console.log(yellow('Updating FAQs to Database...'));
  insertData("FAQs", top5Questions, true);
};

class MaxHeap {
  constructor() {
    this.heap = [];
  }

  insert(value) {
    this.heap.push(value);
    this.bubbleUp(this.heap.length - 1);
  }

  bubbleUp(index) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex].frequency >= this.heap[index].frequency) {
        break;
      }
      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  extractMax() {
    const max = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.sinkDown(0);
    }
    return max;
  }

  sinkDown(index) {
    while (true) {
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;
      let largest = index;

      if (
        leftChildIndex < this.heap.length &&
        this.heap[leftChildIndex].frequency > this.heap[largest].frequency
      ) {
        largest = leftChildIndex;
      }

      if (
        rightChildIndex < this.heap.length &&
        this.heap[rightChildIndex].frequency > this.heap[largest].frequency
      ) {
        largest = rightChildIndex;
      }

      if (largest !== index) {
        this.swap(index, largest);
        index = largest;
      } else {
        break;
      }
    }
  }
}

const getHighestFrequency = () => {
  const questionsFrequencyList = readJSONFile("./question_frequency.json");
  const maxHeap = new MaxHeap();

  // Build max heap
  questionsFrequencyList.forEach((item) => {
    maxHeap.insert(item);
  });

  // Get top 5 elements
  const top5Questions = [];
  for (let i = 0; i < 5 && maxHeap.heap.length > 0; i++) {
    top5Questions.push(maxHeap.extractMax());
  }

  return top5Questions;
};


module.exports = {
  updateFrequency,
  insertFAQsToDatabase
};