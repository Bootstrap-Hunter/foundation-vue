declare module 'foundation-vue' {
    import Vue, { PluginFunction, PluginObject } from 'vue';

    class FoundationVue implements PluginObject<{}> {
        [key: string]: any;
        public install: PluginFunction<{}>;
    }

    const VuePlugin: FoundationVue;

    export default VuePlugin;

    export interface Grid extends Vue {}
}