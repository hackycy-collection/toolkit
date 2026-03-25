<script setup lang="ts">
import type { TableActionItem } from './types';

import { computed } from 'vue';

import { Button, Dropdown, Menu, Space } from 'ant-design-vue';

import ActionItem from './ActionItem.vue';

defineOptions({
  name: 'TableAction',
});

const props = withDefaults(
  defineProps<{
    actions?: TableActionItem[];
    dropDownActions?: TableActionItem[];
  }>(),
  {
    actions: () => [],
    dropDownActions: () => [],
  },
);

const visibleActions = computed(() => {
  return props.actions.filter(Boolean);
});

const visibleDropDownActions = computed(() => {
  return props.dropDownActions.filter(Boolean);
});

function getActionKey(action: TableActionItem, index: number) {
  return action.key ?? `${action.label}-${index}`;
}
</script>

<template>
  <Space :size="0" class="table-action">
    <ActionItem
      v-for="(action, index) in visibleActions"
      :key="getActionKey(action, index)"
      :action="action"
    />

    <Dropdown v-if="visibleDropDownActions.length > 0" trigger="click">
      <Button type="link" size="small">更多</Button>
      <template #overlay>
        <Menu>
          <ActionItem
            v-for="(action, index) in visibleDropDownActions"
            :key="getActionKey(action, index)"
            :action="action"
            dropdown
          />
        </Menu>
      </template>
    </Dropdown>
  </Space>
</template>
