import { useState, useEffect, useRef } from 'react';

class TypeWriter {
  private memoWord: string = '';
  private nextWord: string = '';
  private word: string = '';
  private eventQueue: string[];
  private dummyQueue: Array<string | undefined>;
  private erasing: boolean = false;

  constructor() {
    this.dummyQueue = [];
    this.eventQueue = [];
  }

  public restartTypeWriter() {
    this.memoWord = this.nextWord;
    this.eventQueue = this.nextWord ? this.nextWord.split('') : [];
    this.erasing = false;
    return '';
  }

  public typing() {
    if (this.erasing && !this.word) {
      return this.restartTypeWriter();
    }
    if (this.erasing && this.word) {
      return this.erase();
    }
    if (this.word === this.memoWord) {
      return this.word;
    }
    const el = this.eventQueue.shift();
    this.dummyQueue.push(el);
    this.word = this.dummyQueue.join('');
    return this.word;
  }

  public startTypeWord(str: string) {
    this.erasing = true;
    this.nextWord = str;
    this.dummyQueue.pop();
    this.word = this.dummyQueue.join('');
    return this.word;
  }

  public erase() {
    this.dummyQueue.pop();
    this.word = this.dummyQueue.join('');
    return this.word;
  }

  public rd(): number {
    const r = Math.random();
    return r > 0.1 || r < 0.07 ? this.rd() : r * 1000;
  }
}

const writer = new TypeWriter();

export default function useTypeWriter(str: string) {
  const [word, setWord] = useState<null | string>(null);
  const intervalRef = useRef<any>({});
  const strRef = useRef<any>({});

  useEffect(() => {
    strRef.current = setWord(writer.startTypeWord(str));
  }, [str]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setWord(writer.typing());
    }, writer.rd());
    return function clear() {
      clearInterval(intervalRef.current);
    };
  }, [word]);

  return word;
}
