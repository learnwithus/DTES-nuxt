<template>
  <markdown-container>
    <markdown-column size="1" style="padding-right: 3em">{{activeContentKey ? content[activeContentKey] : content["default"]}}</markdown-column>

    <markdown-column size="1" style="padding-left: 3em">
      <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
        <g>
          <title>Circles</title>
          <ellipse ry="150" rx="150" :class="{active: isActive('community')}" class="venn-cirlcle" cy="368.98567" cx="303.88194" @mouseover="setActiveContent('community')"/>
          <ellipse ry="150" rx="150" :class="{active: isActive('staff')}" class="venn-cirlcle" cy="368.98567" cx="511.88435" @mouseover="setActiveContent('staff')"/>
          <ellipse ry="150" rx="150" :class="{active: isActive('individual')}" class="venn-cirlcle" cy="184" cx="400" @mouseover="setActiveContent('individual')" />
        </g>
        <g>
          <title>Icons</title>
          <image x="370" y="80"  class="venn-icon" :class="{active: isActive('individual')}" :width="iconSize" :height="iconSize" xlink:href="~/assets/images/icons/individual.svg" />
          <image x="250" y="340" class="venn-icon" :class="{active: isActive('community')}" :width="iconSize" :height="iconSize" xlink:href="~/assets/images/icons/community.svg" />
          <image x="490" y="340" class="venn-icon" :class="{active: isActive('staff')}" :width="iconSize" :height="iconSize" xlink:href="~/assets/images/icons/staff.svg" />
        </g>
        <g>
          <title>Text</title>
          <text y="200" x="367" :class="{active: isActive('individual')}" class="venn-title" >Individual</text>
          <text y="460" x="240" :class="{active: isActive('community')}" class="venn-title">Community</text>
          <text y="460" x="507" :class="{active: isActive('staff')}" class="venn-title">Staff</text>
        </g>
        
      </svg>
    </markdown-column>
  </markdown-container>
</template>

<script>
export default {
  data: () => ({
    iconSize: 70,
    activeContentKey: false,
    content: {
      default: 
        `The negative impacts of stigma can be felt through the continuum of care, from individual stigma, to structural or institutional stigma, to broader stigma in society as a whole. 
        Examples of these impacts can be seen by clicking on the levels of stigma: \n
        Click on the diagram on the right to learn more.`,
      individual: 
        `The negative impacts of stigma can be felt through the continuum of care, 
        from individual stigma, to structural or institutional stigma, to broader stigma in society as a whole. 
        Examples of these impacts can be seen by clicking on the levels of stigma:`,
      community: "community",
      staff: "staff",
    },
  }),
  methods: {
    setActiveContent(key){
      this.activeContentKey = key;
      this.contentToDisply = this.content[this.activeContentKey];
      console.log(this.contentToDisply)
    },
    isActive(key){
      return this.activeContentKey == key;
    }
  }
};
</script>

<style scoped lang="scss">
.venn-cirlcle {

  stroke-width: 2px;
  stroke:  white;
  fill: none;
  pointer-events:all;

  &.active{
      fill: rgba(255, 255, 255, 0.75);
      // color: $colour-primary;
  }
}

.venn-title{
  fill: white;

  &.active {
    fill: $text-colour-dark;
  }
}

.venn-icon {
  &.active {
    filter: brightness(20%);
  }
}
</style>