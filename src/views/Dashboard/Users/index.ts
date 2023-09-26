import { UserService } from "@/services/user";
import { User } from "@/types/user";
import { Component, Vue } from "vue-property-decorator";
import CreateUserModal from "@/components/UI/Dashboard/CreateUserModal/CreateUserModal.vue";
import { UserStatus } from "@/types/auth";

@Component({
  name: "admin-users-page",
  components: {
    CreateUserModal,
  },
})
export default class AdminUsersPage extends Vue {
  private keyword = "";
  private listUsers = [] as User[];
  private listUsersOrigin = [] as User[];

  private currentPage = 1;
  private maxPerPage = 10;
  private totalPages = 1;
  private totalItems = 0;

  private isLoading = false;
  private visibleCreateUserModal = false;
  private userEdit: User | null = null;

  get listUserStatus(): UserStatus[] | null {
    return this.$store.getters["user/listUserStatus"];
  }

  private mounted() {
    this.getListUsers();
    if (!this.listUserStatus) {
      this.getListUserStatus();
    }
  }

  private async getListUsers() {
    try {
      this.isLoading = true;
      const { data, meta } = await UserService.getUsers({
        current_page: this.currentPage,
        per_page: this.maxPerPage,
      });
      this.listUsers = data;
      this.listUsersOrigin = data;
      this.totalPages = meta.last_page;
      this.totalItems = meta.total;
    } catch (error) {
      //
    } finally {
      this.isLoading = false;
    }
  }

  private async getListUserStatus() {
    try {
      const { data } = await UserService.getListUserStatus({
        filters: {
          name: "",
        },
      });
      this.$store.dispatch("user/updateListUserStatus", data);
    } catch (error) {
      //
    }
  }

  private handleSizeChange(val: number) {
    this.maxPerPage = val;
    if (this.currentPage !== 1) {
      this.currentPage = 1;
      return;
    }
    this.getListUsers();
  }
  private handleCurrentChange(val: number) {
    this.currentPage = val;
    this.getListUsers();
  }

  private handleReload(data?: User) {
    this.visibleCreateUserModal = false;
    if (!data) {
      this.currentPage = 1;
      this.getListUsers();
    } else {
      const indexEdited = this.listUsers.findIndex(
        (item) => item.id === data.id
      );
      this.listUsers.splice(indexEdited, 1, data);
      this.listUsersOrigin.splice(indexEdited, 1, data);
    }
  }

  private handleSearch() {
    this.listUsers = this.listUsersOrigin.filter(
      (item) =>
        item.full_name.toLowerCase().includes(this.keyword.toLowerCase()) ||
        item.email.toLocaleLowerCase().includes(this.keyword.toLowerCase())
    );
  }

  private openConfirmDelete(index: number, row: User) {
    this.$confirm("Are you sure to delete this user?", "Confirm", {
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      type: "warning",
      confirmButtonClass: "el-button--danger",
    })
      .then(() => {
        this.handleDelete(row.id);
      })
      .catch(() => {
        //
      });
  }

  private async handleDelete(userId: number) {
    console.log("handleDelete", userId);
    try {
      this.isLoading = true;
      await UserService.deleteUser(userId);
      this.getListUsers();
    } catch (error) {
      //
    }
  }

  private openFormEdit(index: number, row: any) {
    this.userEdit = row;
    this.visibleCreateUserModal = true;
  }
}
