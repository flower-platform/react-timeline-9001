<table>
<tr>
<th>Fig. 1</th>
<th>Fig. 2</th>
</tr>
<tr>
<td>
<div align="center">
<details><summary>Click to expand full image</summary>

![](screenshots/DragToCreateTestsAreDemo.whenClickAddMenuEntry/ContextMenu_popup_ContextMenu_menuItem_0.png)

</details>

![](screenshots/DragToCreateTestsAreDemo.whenClickAddMenuEntry/ContextMenu_popup_ContextMenu_menuItem_0_small.png)

<br />

Open the context menu (right click or click on the hamburger button from the top/left corner. Click ...

</div>
</td>
<td>
<div align="center">
<details><summary>Click to expand full image</summary>

![](screenshots/DragToCreateTestsAreDemo.whenClickAddMenuEntry/Timeline_dragToCreatePopup.png)

</details>

![](screenshots/DragToCreateTestsAreDemo.whenClickAddMenuEntry/Timeline_dragToCreatePopup_small.png)

<br />

... and you enter in the 'drag to create' mode. The popup hides itself quickly, to make sure it doesn't bother the user. This mode is cancelable via button or simple click (i.e. not click and drag).

</div>
</td>
</tr>
</table>
<table>
<tr>
<th>Fig. 3</th>
<th>Fig. 4</th>
</tr>
<tr>
<td>
<div align="center">
<details><summary>Click to expand full image</summary>

![](screenshots/DragToCreateTestsAreDemo.givenDragToCreateModeInProgressWhenMouseUp/Timeline_ganttBody_Timeline_row_3_REP2.png)

</details>

![](screenshots/DragToCreateTestsAreDemo.givenDragToCreateModeInProgressWhenMouseUp/Timeline_ganttBody_Timeline_row_3_REP2_small.png)

<br />

Click and drag on a row. A green rectangle appears as you drag. A right drag cancels the operation and exits the 'drag to create' mode.

 **TODO!!!** avem acest comportament de anulare a dragului?

</div>
</td>
<td>
<div align="center">
<details><summary>Click to expand full image</summary>

![](screenshots/DragToCreateTestsAreDemo.givenDragToCreateModeInProgressWhenMouseUp/Timeline_ganttBody_Timeline_row_2_Timeline_item_11.png)

</details>

![](screenshots/DragToCreateTestsAreDemo.givenDragToCreateModeInProgressWhenMouseUp/Timeline_ganttBody_Timeline_row_2_Timeline_item_11_small.png)

<br />

When you do `mouse up` (to `drop`), your handler will be called, receiving useful args (e.g. row, start/end, etc.). It can e.g. create a new segment.

 **TODO!!!** poza nu e buna. Ar fi trebuit sa captureze segmentul nou creat

</div>
</td>
</tr>
</table>
