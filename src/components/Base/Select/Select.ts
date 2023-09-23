import { Component, Prop, Vue } from "vue-property-decorator";

export interface SelectOption {
  value: string;
  label: string;
  className?: string;
}

@Component({
  name: "select-component",
  components: {
    //
  },
})
export default class Select extends Vue {
  @Prop({ default: "" }) private className?: string;
  @Prop({ default: [] }) private options!: SelectOption[];
  @Prop({ default: "" }) private id?: string;
  @Prop({ default: "" }) private selectClass?: string;
  @Prop({ default: "" }) private value?: string;
  @Prop({ default: false }) private required?: boolean;
}
