<template>
    <div class="container">
        <div class="multi-select" ref="multiSelect">
            <div class="selected-options">
                <div v-for="(selectedOption, key, index) in selectedOptions" :key="index" class="selected-options--option">
                    <button type="button" class="selected-options--option--button" @click.prevent="removeOption(key)">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <span v-html="selectedOption"></span>
                </div>
            </div>
            <input type="text" class="input-control" @focus="showListbox">
            <div class="container">
                <div v-if="displayListbox" class="listbox">
                    <div v-for="(currentOption, index) in options" :key="index" :class="selectedOptions[currentOption[`${optionIndex}`]] ? 'listbox--item--selected' : 'listbox--item'" @click="selectOption(currentOption)">
                        <input type="checkbox" :checked="selectedOptions[currentOption[`${optionIndex}`]]" class="hidden">
                        <span>{{currentOption[`${optionLabel}`]}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script scoped>
export default {
    data() {
        return {
            displayListbox: false,
            selectedOptions: {},
        }
    },
    mounted() {
        this.getStarted();
    },
    props: {
        options: Object,
        optionIndex: String,
        optionLabel: String,
        modelValue: {},
    },
    emits: ['update:modelValue'],
    methods: {
        getStarted() {
            var self = this;
            document.addEventListener('click', function() {
                self.hideListbox();
            });
            this.$refs.multiSelect.addEventListener('click', function(e) {
                e.stopPropagation();
                return false;
            });
        },
        showListbox() {
            this.displayListbox = true;
        },
        hideListbox() {
            this.displayListbox = false;
        },
        selectOption(selectedOption) {
            if(typeof this.selectedOptions[selectedOption[`${this.optionIndex}`]] !== 'undefined') {
                this.removeOption(selectedOption[`${this.optionIndex}`]);
            } else {
                this.selectedOptions[selectedOption[`${this.optionIndex}`]] = selectedOption[`${this.optionLabel}`];
            }
            this.$emit('update:modelValue', this.selectedOptions);
            this.hideListbox();
        },
        removeOption(selectedOption) {
            console.log('suppose to remove option');
            delete this.selectedOptions[selectedOption];
        },
    },
}
</script>

<style>
*,
*::before,
*::after {
    border: 0;
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
}

html, body {
    padding: 10px;
}

.container {
    width: 100%;
    position: relative;
}

.multi-select {
    width: 100%;
    border: solid rgb(235, 236, 240) 1px;
    border-radius: 4px;
    position: relative;
}

.multi-select .input-control {
    width: 100%;
    padding: 8px 12px;
    border: 0;
}

.selected-options {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}

.selected-options--option {
    margin: 4px;
    padding: 8px 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 4px;
    color: rgb(75, 85, 99);
    background-color: rgb(229, 231, 235);
}

.selected-options--option--button {
    color: rgb(243, 244, 246);
    background-color: rgb(156, 163, 175);
}

.selected-options--option--button .icon {
    width: 16px;
    height: 16px;
}

.hidden {
    display: none;
}

.listbox {
    height: 240px;
    z-index: 9999;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    border: solid rgb(156, 163, 175) 1px;
    overflow-y: auto;
    background-color: rgb(255, 255, 255);
}

.listbox--item {
    cursor: pointer;
    padding: 8px 16px;
}

.listbox--item--selected {
    cursor: pointer;
    padding: 8px 16px;
    color: rgb(156, 163, 175);
    background-color: rgb(235, 236, 240);
}
.listbox--item:hover {
    color: rgb(255, 255, 255);
    background-color: rgb(156, 163, 175);
}
</style>