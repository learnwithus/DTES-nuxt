<template>
  <markdown-container>
    <markdown-column size="1" style="padding-right: 3em">{{contentToDisply ? content[contentToDisply] : "Hover over circles to view"}}</markdown-column>

    <markdown-column size="1" style="padding-left: 3em">
      <div class="cirlcle" @mouseover="contentToDisply = 'individual'">Individual Level</div>
      <div class="cirlcle" @mouseover="contentToDisply = 'community'">Community Level</div>
      <div class="cirlcle" @mouseover="contentToDisply = 'staff'">Staff Level</div>
    </markdown-column>
  </markdown-container>
</template>

<script>
export default {
  data: () => ({
    contentToDisply: false,
    content: {
      individual: 
        `The negative impacts of stigma can be felt through the continuum of care, 
        from individual stigma, to structural or institutional stigma, to broader stigma in society as a whole. 
        Examples of these impacts can be seen by clicking on the levels of stigma:`,
      community: "community",
      staff: "staff",
    },
  }),
};
</script>

<style scoped lang="scss">
.cirlcle {
  height: 6em;
  width: 6em;
  padding: 2em;
  border: 2px white solid;
  text-align: center;
  border-radius: 50%;

  &:hover{
      background-color: white;
      color: $colour-primary;
  }
}
</style>