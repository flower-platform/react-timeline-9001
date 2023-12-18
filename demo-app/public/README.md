1/ By default, vite projects have such a `public` dir, containing the entry point/html file.
2/ Here, we removed this dir, because the entry point is under `src`.
3/ To use the beta of TAD + Markdown reports, we recreated this dir, because TAD has `public` hardcoded. 
4/ But in the future, maybe 2 is a better approach. I.e. to have all under `src`. And an adaptation will be made for 3/.