import fs from 'node:fs/promises';

async function readInput(fileName) {
  try {
    const data = await fs.readFile(fileName, { encoding: 'utf8' });
    return data;
  } catch (err) {
    console.error(err);
  }
}

async function main(debug) {
  const input = await readInput(debug ? "sample" : "input");

  let curr = 50;
  let answer = 0;

  input.split("\n").forEach(entry => {
    if (debug) console.log("Start: ", entry);
    const movement = Number(entry.slice(1));

    if(entry.charAt(0) == "L") {
      curr -= movement;
    } else if (entry.charAt(0) == "R") {
      curr += movement;
    }

    if(curr === 0) {
      answer++;
    } else {
      if (Math.abs(curr) != movement) answer++;
      while (curr < 0 || curr > 99) {
        if (curr > 99) {
          curr -= 100;
        } else if (curr < 0) {
          curr += 100;
        }
        if (debug) console.log("Rotate: ", curr, answer);
      }
    }


    if (debug) console.log("End: ", entry, curr, answer);
  });
  return answer;
}

console.log(await main(false));
