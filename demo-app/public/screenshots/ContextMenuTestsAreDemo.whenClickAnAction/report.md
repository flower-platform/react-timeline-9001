
# ContextMenuTestsAreDemo.whenClickAnAction()

### WHEN I click on an action, THEN the action is run (w/ or w/o closing the menu)

---

## The following error was caught while running the test:

```
TestingLibraryElementError: Unable to find an element by: [data-testid="ContextMenu_popup"]
	  at Object.getElementError [const error = new Error([message, "Ignored nodes: comments, " + config.defaultIgnore + "\n" + prettifiedDOM].filter(Boolean).join('\n\n'));] (http://localhost:3000/node_modules/@testing-library/dom/dist/@testing-library/dom.esm.js:326:19)
	  [throw getConfig().getElementError(getMissingError(container, ...args), container);] (http://localhost:3000/node_modules/@testing-library/dom/dist/@testing-library/dom.esm.js:1149:25)
	  [const els = allQuery(container, ...args);] (http://localhost:3000/node_modules/@testing-library/dom/dist/@testing-library/dom.esm.js:1128:17)
	  [const element = query(container, ...args);] (http://localhost:3000/node_modules/@testing-library/dom/dist/@testing-library/dom.esm.js:1171:19)
	  at Object.getByTestId [const result: any = oldFunction.apply(null, args);] (http://localhost:3000/node_modules/@famiprog-foundation/tests-are-demo/src/lib/TestsAreDemoFunctions.tsx:203:49)
	  at ContextMenuTestsAreDemo.whenClickAnAction [const popup = tad.screenCapturing.getByTestId(contextMenuTestIds.popup);] (http://localhost:3000ContextMenuTestsAreDemo.tsx:44:43)
	  at callFn [var result = fn.call(ctx);] (http://localhost:3000/node_modules/mocha/lib/runnable.js:366:21)
	  at Runnable.run [callFn(this.fn);] (http://localhost:3000/node_modules/mocha/lib/runnable.js:354:5)
	  at Runner.runTest [test.run(fn);] (http://localhost:3000/node_modules/mocha/lib/runner.js:666:10)
	  [self.runTest(function (err) {] (http://localhost:3000/node_modules/mocha/lib/runner.js:789:12)
```

---


There are 0 screenshots. [Go to first](#screenshot-1)
