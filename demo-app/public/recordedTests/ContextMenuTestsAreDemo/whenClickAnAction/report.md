
# ContextMenuTestsAreDemo/whenClickAnAction()

### undefined

---

## The following error was caught while running the test:

```
Error: Unable to find an element by: [data-testid="ContextMenu_popup"]
	  at Object.getElementError [return new Error(message || "n/a"); // I observed that message is null (at least) for the case where multiple elements are found, and only one was expected] (http://localhost:3000/node_modules/@famiprog-foundation/tests-are-demo/src/lib/reactTestingLibraryCustomized.tsx:24:12)
	  [throw getConfig().getElementError(getMissingError(container, ...args), container);] (http://localhost:3000/node_modules/@testing-library/dom/dist/@testing-library/dom.esm.js:1149:25)
	  [const els = allQuery(container, ...args);] (http://localhost:3000/node_modules/@testing-library/dom/dist/@testing-library/dom.esm.js:1128:17)
	  [const element = query(container, ...args);] (http://localhost:3000/node_modules/@testing-library/dom/dist/@testing-library/dom.esm.js:1171:19)
	  at Object.getByTestId [const result: any = oldFunction.apply(null, args);] (http://localhost:3000/node_modules/@famiprog-foundation/tests-are-demo/src/lib/TestsAreDemoFunctions.tsx:203:49)
	  at ContextMenuTestsAreDemo.whenClickAnAction [const popup = tad.screenCapturing.getByTestId(contextMenuTestIds.popup);] (http://localhost:3000ContextMenuTestsAreDemo.tsx:44:43)
	  at callFn [var result = fn.call(ctx);] (http://localhost:3000/node_modules/mocha/lib/runnable.js:366:21)
	  at Runnable.run [callFn(this.fn);] (http://localhost:3000/node_modules/mocha/lib/runnable.js:354:5)
	  at Runner.runTest [test.run(fn);] (http://localhost:3000/node_modules/mocha/lib/runner.js:666:10)
	  [self.runTest(function (err) {] (http://localhost:3000/node_modules/mocha/lib/runner.js:789:12)
	  at next [return fn();] (http://localhost:3000/node_modules/mocha/lib/runner.js:581:14)
	  [next(suites.pop());] (http://localhost:3000/node_modules/mocha/lib/runner.js:591:7)
	  at next [return fn();] (http://localhost:3000/node_modules/mocha/lib/runner.js:474:14)
	  [next(0);] (http://localhost:3000/node_modules/mocha/lib/runner.js:559:5)
	  at timeslice [immediateQueue.shift()();] (http://localhost:3000/node_modules/mocha/browser-entry.js:100:28)
```

---


There are 0 screenshots. [Go to first](#screenshot-1)
