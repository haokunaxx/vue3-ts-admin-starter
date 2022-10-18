<template>
  <div
    class="guides guides-x"
    v-if="matchGuides.y"
    :style="{ top: matchGuides.y + 'px' }"
  ></div>
  <div
    class="guides guides-y"
    v-if="matchGuides.x"
    :style="{ left: matchGuides.x + 'px' }"
  ></div>
</template>

<script setup lang="ts">
import { MatchGuides } from './types'
interface Props {
  matchGuides: MatchGuides
}
const props = defineProps<Props>()
const { matchGuides } = toRefs(props)
</script>

<style lang="scss" scoped>
$guidesColor: #2c82fd;

.guides {
  position: absolute;
}

.guides- {
  z-index: 10;

  &x {
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, rgba($guidesColor, 0.4) 50%, #fff 0);
    background-size: 12px 100%;
    // background: repeating-linear-gradient(
    //     90deg,
    //     transparent 0,
    //     transparent 5px,
    //     #ddd 5px,
    //     #ddd 10px
    //   ),
    //   linear-gradient(
    //     180deg,
    //     transparent 0,
    //     transparent 0,
    //     #000 0,
    //     #000 1px,
    //     transparent 1px,
    //     transparent 0
    //   );
    // background-position: 0 0;
    // background-repeat: no-repeat;
    // background-size: 100% 1px;
  }

  &y {
    width: 1px;
    height: 100%;
    background: linear-gradient(to bottom, rgba($guidesColor, 0.4) 50%, #fff 0);
    background-size: 100% 12px;
  }
}
</style>
