export const defaultItemRendererScenarios = {
  givenBasicSegmentsThenRender:
    'GIVEN we feed (for each row) some basic segments (items) THEN they are rendered using the style from the default item renderer',
  givenCustomClassNameForSegmentsThenRender:
    'GIVEN we feed a custom segment (item) class name THEN the css class is applied for all the segments (items)',
  givenCustomStyleForSegmentsThenRender:
    'GIVEN we feed a custom segment (item) style THEN the style is applied for all the segments (items)',
  givenSegmentsTask1WithGradientThenRender:
    'GIVEN we feed (for each row) a segment (item) with title "Task *1", different color and gradientBrightness=70 THEN they are rendered having a color ligher with 70% at the top and the base color at the bottom',
  givenSegmentsTask2WithGradientThenRender:
    'GIVEN we feed (for each row) a segment (item) with title "Task *2", different color, same gradientBrightness as "Task *1", but with gradientStop=10 THEN they are rendered having the lighter color at the top that stops at 10% from the height of the segment (item) and the base color at the bottom',
  givenSegmentsTask3WithGradientThenRender:
    'GIVEN we feed (for each row) a segment (item) with title "Task *3", different color, same gradientBrightness and gradientStop as "Task *2", but with reverseDirection=true THEN they are rendered having the base color at the top that stops at 10% from the height of the segment(item) and the lighter color at the bottom',
  givenSegmentsThenRender: 'GIVEN we feed (for each row) some segments (items) THEN they are rendered',
  givenSegmentsAndCustomItemRendererThenRender:
    'GIVEN we feed (for each row) some segments (items) and an item renderer (CustomItemRenderer) THEN the segments (items) are rendered using the custom item renderer',
  givenSegmentsTask1WithCustomItemRendererThenRender:
    'GIVEN "Task *1" segments (items) use Task1CustomItemRenderer THEN they are rendered with a custom title and a custom text color',
  givenSegmentsTask2WithCustomItemRendererThenRender:
    'GIVEN "Task *2" segments (items) use Task2CustomItemRenderer THEN they are rendered with a solid color instead of a gradient and a custom css class',
  givenSegmentsTask3WithCustomItemRendererThenRender:
    'GIVEN "Task *3" segments (items) use Task3CustomItemRenderer THEN they are rendered with a custom style and a custom item height',
  givenSegmentsWithGlowThenRender:
    'GIVEN we feed (for each row) some segments (items) with glowOnHover THEN they are rendered',
  givenSegmentsWithTooltipPropertyThenRender:
    'GIVEN we feed (for each row) some segments (items) with tooltip property THEN they are rendered',
  whenMouseOverSegmentWithTooltipThenRenderTooltip:
    'WHEN we move the mouse over a segment (item) THEN a tooltip appears',
  whenMouseOverSegmentWithGlowThenRender:
    'WHEN we move the mouse over a segment (item) THEN a glow appears around the segment'
};
