import nerdamer from "nerdamer/all";
import {
  randomQuadratic,
  randomSymbol,
  buildLinearExpressionFromValue,
  randomLinearTerm,
} from "../builders";
import {
  randomIntInRange,
  gcd,
  replaceAll,
  randomFactor,
  randomOp,
  randomSquare,
  randomMultOrDiv,
  randomAddOrSub,
  performOp,
  randomFactorOfNumber,
  randomCompositeNumber,
  oppositeOp,
  randomize,
} from "../utils";

import { POS_SQUARES } from "../sets";

export default [
  {
    id: 0,
    title: "Solve one step linear equations",
    description: "Solve very basic linear equations.",
    example: "x+17=34",
    category: "Algebra I",
    tags: ["Equations"],
    numFields: 1,

    buttons: [],

    generate: () => {
      const solution = randomIntInRange(-20, 20, [0]);
      const symbol = randomSymbol();
      let lhs = nerdamer(symbol);
      let rhs = nerdamer(solution);

      const op = randomOp();

      if (op === "DIV") {
        const factor = randomFactorOfNumber(solution);

        if (factor) {
          lhs = performOp(op, nerdamer(symbol), factor);
          rhs = performOp(op, nerdamer(solution), factor);
        } else {
          const v = randomIntInRange(-8, 8, [0, 1]);
          // prime
          lhs = performOp("MULT", nerdamer(symbol), v);
          rhs = performOp("MULT", nerdamer(solution), v);
        }
      } else {
        const value = randomIntInRange(-10, 10, [0, 1, -1]);

        lhs = performOp(op, lhs, value);
        rhs = performOp(op, rhs, value);
      }
      ({ lhs, rhs } = randomize(lhs, rhs));
      const latex = replaceAll(lhs.toTeX() + "=" + rhs.toTeX(), "\\cdot", "");

      return {
        solution,
        latex,
        instructions: `Solve for ${symbol}`,
        prompts: [`${symbol} =`],
      };
    },
    verify: (question, userResponse, _, providedSolution) => {
      return nerdamer
        .convertFromLaTeX(userResponse)
        .eq(nerdamer.convertFromLaTeX(providedSolution));
    },
  },
  {
    id: 1,

    title: "Solve two-step linear equations",
    description: "Solve very basic linear equations.",
    example: "6 = \\frac{x}{4} + 2",
    category: "Algebra I",
    tags: ["Equations"],
    numFields: 1,

    buttons: [],

    generate: () => {
      const solution = randomCompositeNumber(-25, 25, [0, 1, -1]);
      const symbol = randomSymbol();
      let lhs = nerdamer(symbol);
      let rhs = nerdamer(solution);

      const value = randomFactorOfNumber(solution);
      const op1 = randomMultOrDiv();

      lhs = performOp(op1, lhs, value);
      rhs = performOp(op1, rhs, value);

      const op2 = randomAddOrSub();
      const v2 = randomIntInRange(-20, 20, [0]);
      lhs = performOp(op2, lhs, v2);
      rhs = performOp(op2, rhs, v2);
      ({ lhs, rhs } = randomize(lhs, rhs));
      const latex = replaceAll(lhs.toTeX() + "=" + rhs.toTeX(), "\\cdot", "");

      return {
        solution,
        latex,
        instructions: `Solve for ${symbol}`,
        prompts: [`${symbol} =`],
      };
    },
    verify: (question, userResponse, _, providedSolution) => {
      return nerdamer
        .convertFromLaTeX(userResponse)
        .eq(nerdamer.convertFromLaTeX(providedSolution));
    },
  },
  {
    id: 2,
    title: "Solve multi-step linear equations",

    description: "Solve multi-step linear equations",
    example: "2x+10=50",
    category: "Algebra I",
    tags: ["Equations"],
    numFields: 1,

    buttons: [],

    generate: () => {
      const solution = randomIntInRange(-25, 25, [0]);
      const symbol = randomSymbol();

      let lhs = nerdamer(symbol);
      let rhs = nerdamer(solution);

      const v1 = randomIntInRange(-15, 15, [0]);

      const op = "ADD";
      lhs = performOp(op, lhs, v1);
      rhs = performOp(op, rhs, v1);

      const v2 = randomIntInRange(-5, 5, [0, 1]);
      lhs = performOp("MULT", lhs, v2);
      rhs = performOp("MULT", rhs, v2);

      const v3 = randomIntInRange(-8, 8, [0]);
      lhs = performOp("ADD", lhs, nerdamer(symbol).multiply(v3));
      rhs = performOp("ADD", rhs, nerdamer(symbol).multiply(v3));
      ({ lhs, rhs } = randomize(lhs, rhs));
      let latex = lhs.toTeX() + "=" + rhs.toTeX();
      latex = replaceAll(latex, "\\cdot", "");
      return {
        solution,
        latex,
        stringVersion: lhs.toString(),
        instructions: `Solve for ${symbol}`,
        prompts: [`${symbol} =`],
      };
    },
    verify: (question, userResponse, _, providedSolution) => {
      return nerdamer
        .convertFromLaTeX(userResponse)
        .eq(nerdamer.convertFromLaTeX(providedSolution));
    },
  },
  // {
  //   id: 3,
  //   title: "Absolute Value Equations",
  //   instructions: "Solve for x",
  //   description: "Solve multi-step linear equations",
  //   example: "2x+10=50",
  //   category: "Algebra I",
  //   tags: ["Equations"],
  //   numFields: 1,
  //   prompts: ["x ="],
  //   buttons: [],

  //   generate: () => {
  //     const rhsval = randomIntInRange(0, 25);
  //     const symbol = "x";

  //     let lhs = nerdamer(symbol);
  //     let rhs = nerdamer(rhsval);

  //     const v1 = randomIntInRange(-10, 10, [0, 1]);

  //     const op = randomOp();

  //     lhs = performOp(op, lhs, v1);

  //     lhs = nerdamer(`abs(${lhs.toString()})`);
  //     console.log(lhs.toString());
  //     let latex = `${lhs.toTeX()}` + "=" + rhs.toTeX();
  //     latex = replaceAll(latex, "\\cdot", "");
  //     return { rhsval, latex, stringVersion: lhs.toString() };
  //   },
  //   verify: (question, userResponse, _, providedSolution) => {
  //     console.log(nerdamer.solve(nerdamer.convertFromLaTeX(question)));
  //     return nerdamer
  //       .convertFromLaTeX(userResponse)
  //       .eq(nerdamer.convertFromLaTeX(providedSolution));
  //   },
  // },

  {
    id: 4,
    title: "Easy radical equations",
    description: "Solve multi-step linear equations",
    example: "\\sqrt{x-4} = 3",
    category: "Algebra I",
    tags: ["Equations"],
    numFields: 1,
    buttons: [],

    generate: () => {
      const square = randomSquare();
      const symbol = randomSymbol();

      const op = randomOp();
      console.log(op);
      let value;
      if (op === "DIV") {
        value = randomFactorOfNumber(square);
      } else if (op === "SUB") {
        value = randomIntInRange(square + 1, square + 10);
      } else {
        value = randomIntInRange(5, 25);
      }

      let lhs = nerdamer(symbol);
      let rhs = nerdamer(square);

      // rhs = performOp(op, rhs, value);
      lhs = performOp(oppositeOp(op), lhs, value);
      console.log(square, op, value, lhs.toString());
      const solution = parseInt(
        performOp(op, nerdamer(square), value).toString()
      );
      lhs = nerdamer.sqrt(lhs);
      rhs = nerdamer.sqrt(rhs);

      ({ lhs, rhs } = randomize(lhs, rhs));

      let latex = lhs.toTeX() + "=" + rhs.toTeX();
      latex = replaceAll(latex, "\\cdot", "");
      return {
        solution,
        latex,
        stringVersion: lhs.toString(),
        instructions: `Solve for ${symbol}`,
        prompts: [`${symbol} = `],
      };
    },
    verify: (question, userResponse, _, providedSolution) => {
      return nerdamer
        .convertFromLaTeX(userResponse)
        .eq(nerdamer.convertFromLaTeX(providedSolution));
    },
  },
  /* TODO: HARD RADICAL EQUATIONS  */
  // {
  //   id: 5,
  //   title: "Easy rational equations",
  //   instructions: "Solve for x",
  //   description: "Solve multi-step linear equations",
  //   example: "\\frac{1}{b^2-7b+10}+\\frac{1}{b-2}=\\frac{2}{b^2-7b+10}",
  //   category: "Algebra I",
  //   tags: ["Equations"],
  //   numFields: 1,
  //   prompts: ["x ="],
  //   buttons: [],

  //   generate: () => {
  //     const square = randomSquare();
  //     const symbol = "x";

  //     const set = randomQuadratic(false);

  //     latex = replaceAll(latex, "\\cdot", "");
  //     return { solution: 5, latex, stringVersion: "" };
  //   },
  //   verify: (question, userResponse, _, providedSolution) => {
  //     return nerdamer
  //       .convertFromLaTeX(userResponse)
  //       .eq(nerdamer.convertFromLaTeX(providedSolution));
  //   },
  // },
  {
    id: 6,
    title: "Solving Proportions",
    // instructions: "Solve for x",
    description: "Solve multi-step linear equations",
    example: "\\frac{z}{84}=\\frac{z-6}{12}",
    category: "Algebra I",
    tags: ["Equations"],
    numFields: 1,
    buttons: [],

    generate: () => {
      const symbol = randomSymbol();
      const NUM_OPTIONS = 4;
      const choice = Math.floor(Math.random() * NUM_OPTIONS);

      const solution = randomIntInRange(2, 12);
      const v1 = randomIntInRange(5, 25);

      let lhs = nerdamer(symbol);
      let rhs = nerdamer(solution);
      rhs = performOp("MULT", rhs, v1);
      const rhsVal = solution * v1;
      const v2 = randomFactorOfNumber(rhsVal, [v1]);

      lhs = nerdamer.convertFromLaTeX(`\\frac{${symbol}}{${v2}}`);

      if (choice === 0) {
        rhs = nerdamer(
          buildLinearExpressionFromValue(symbol, solution, rhsVal / v2)
        );
        rhs = performOp("DIV", rhs, nerdamer(v1));

      } else {
        rhs = nerdamer(rhsVal / v2);
        rhs = nerdamer.convertFromLaTeX(`\\frac{${rhs.toTeX()}}{${v1}}`);
      }

      ({ lhs, rhs } = randomize(lhs, rhs));
      const latex = `${replaceAll(
        replaceAll(lhs.toTeX(), "\\left(", ""),
        "\\right)",
        ""
      )}=${replaceAll(
        replaceAll(rhs.toTeX(), "\\left(", ""),
        "\\right)",
        "")
      }`;

      // latex = replaceAll(latex, "\\cdot", "");
      return {
        solution: solution,
        latex,
        stringVersion: "",
        instructions: `Solve for ${symbol}`,
        prompts: [`${symbol} = `],
      };
    },
    verify: (question, userResponse, _, providedSolution) => {
      return nerdamer
        .convertFromLaTeX(userResponse)
        .eq(nerdamer.convertFromLaTeX(providedSolution));
    },
  },
  {
    id: 7,
    title: "Solving Literal Equations",
    // instructions: "Solve for x",
    description: "Solve multi-step linear equations",
    example: "12am=4\\text{, for }a",
    category: "Algebra I",
    tags: ["Equations"],
    numFields: 1,
    buttons: [],

    generate: () => {
      const symbol = randomSymbol();

      let lhs = nerdamer(symbol);
      const s1 = randomSymbol([symbol])
      const s2 = randomSymbol([symbol, s1])
      const s3 = randomSymbol([symbol, s1, s2])
      let rhs = performOp("ADD", randomLinearTerm(-10, 10, [], s1), randomLinearTerm(-10, 10, [], s2))

      rhs = performOp(randomMultOrDiv(), rhs, randomLinearTerm(-10, 10, [0], s3));
      const latex = replaceAll(`${lhs.toTeX()}=${rhs.toTeX()}`, "\\cdot", "");
      return {
        solution: rhs.toTeX(),
        latex,
        stringVersion: "",
        instructions: `Solve for ${symbol}`,
        prompts: [`${symbol} = `],
      };
    },
    verify: (question, userResponse, _, providedSolution) => {
      return nerdamer
        .convertFromLaTeX(userResponse)
        .eq(nerdamer.convertFromLaTeX(providedSolution));
    },
  },
];
