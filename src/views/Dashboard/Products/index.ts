import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "admin-product-page",
  components: {
    //
  },
})
export default class AdminProductsPage extends Vue {
  private inputSearch = "";

  private tableData = [
    {
      date: "2016-05-03",
      name: "Tom",
      state: "California",
      city: "Los Angeles",
      address: "No. 189, Grove St, Los Angeles",
      zip: "CA 90036",
      tag: "Home",
    },
    {
      date: "2016-05-02",
      name: "Tom",
      state: "California",
      city: "Los Angeles",
      address: "No. 189, Grove St, Los Angeles",
      zip: "CA 90036",
      tag: "Office",
    },
    {
      date: "2016-05-04",
      name: "Tom",
      state: "California",
      city: "Los Angeles",
      address: "No. 189, Grove St, Los Angeles",
      zip: "CA 90036",
      tag: "Home",
    },
    {
      date: "2016-05-01",
      name: "Tom",
      state: "California",
      city: "Los Angeles",
      address: "No. 189, Grove St, Los Angeles",
      zip: "CA 90036",
      tag: "Office",
    },
  ];

  private handleSearch() {
    // console.log(this.inputSearch);
  }

  private handleEdit(index: number, row: any) {
    // console.log(index, row);
  }

  private handleDelete(index: number, row: any) {
    // console.log(index, row);
  }
}
