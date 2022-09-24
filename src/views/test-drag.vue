<script setup lang="ts">
// import { useEventListener } from '@/uses/useEventListener'
interface PosInfo {
  top: number;
  left: number;
  right: number;
  bottom: number;
  // height: number;
  // width: number;
}
interface LineInfo {
  id: string;
  start: {
    x: number;
    y: number;
  };
  end?: number;
}
const outlineShow = ref(false),
  el = ref(null);
const posInfo = reactive<PosInfo>({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  // height: 0,
  // width: 0
});
const lines = reactive<LineInfo[]>([]);
const activeLineId = ref<string>("");
const getPointsOfRect = (el: HTMLDivElement) => {
  console.log(el);
  console.log(el.getBoundingClientRect());
  const { top, left, height, width } = el.getBoundingClientRect();
  posInfo.left = left;
  posInfo.top = top;

  posInfo.right = width + left;
  posInfo.bottom = height + top;
  return { top, left, height, width };
};
const showOutline = () => {
  outlineShow.value = true;
};
const addLine = () => {
  // console.log(el?.value)
  const elem = el?.value;
  if (elem && outlineShow.value) {
    const { left, top, height, width } = getPointsOfRect(elem);
    lines.push({
      id: String(Math.random()).slice(5),
      start: {
        x: left + width,
        y: top + height / 2,
      },
    });
  }
};
const deleteLine = () => {
  const idx = lines.findIndex((item) => item.id === activeLineId.value);
  lines.splice(idx, 1);
  console.log(el.value);
};
</script>

<template>
  <section class="edit-wrap">
    <button @click="addLine">add Line</button>
    <button @click="deleteLine">delete line</button>
    <div ref="el" class="box source" @click="showOutline">
      <div :class="['box-outline', outlineShow && 'show']">
        <div :class="['box-content', outlineShow && 'hide-border']">source</div>
      </div>
      <Line
        v-for="line in lines"
        :edge="posInfo"
        :x="line.start.x"
        :y="line.start.y"
        :key="line.id"
      />
    </div>
    <!-- <div class="box end">end</div> -->
  </section>
</template>

<style lang="scss" scoped>
@mixin vh-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.box {
  position: absolute;
  background-color: #fff;
  box-sizing: border-box;

  &-outline {
    border: 3px solid transparent;

    &.show {
      border-color: rgba($color: #2c82fd, $alpha: 60%);
    }
  }

  &-content {
    width: 100px;
    height: 100px;
    border: 1px solid #000;

    @include vh-center;

    &.hide-border {
      border-color: transparent;
    }
  }
}

.source {
  top: 300px;
  left: 300px;
}

.end {
  top: 300px;
  left: 800px;
}

.line {
  position: fixed;
  width: 200px;
  height: 3px;
  background-color: #000;
}
</style>
