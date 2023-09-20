import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "input-component",
  components: {
    //
  },
})
export default class Input extends Vue {
  @Prop({ default: "" }) private id?: string;
  @Prop({ default: "text" }) private type?:
    | "text"
    | "password"
    | "email"
    | "number";
  @Prop({ default: "default" }) private size?: "sm" | "default" | "lg";
  @Prop({ default: "" }) private prefix?: string;
  @Prop({ default: "" }) private suffix?: string;
  @Prop({ default: "" }) private ariaLabel?: string;
  @Prop({ default: "" }) private className?: string;
  @Prop({ default: "" }) private inputClass?: string;
  @Prop({ default: "" }) private placeholder?: string;
  @Prop({ default: false }) private disabled?: boolean;
  @Prop({ default: false }) private required?: boolean;
  @Prop({ default: false }) private isValid?: boolean;
  @Prop({ default: "" }) private invalidFeedback?: string;
  @Prop({ default: "" }) private validFeedback?: string;
  @Prop({ default: "" }) private autoComplete?: string;
  @Prop({ default: "" }) private value?: string;
}
