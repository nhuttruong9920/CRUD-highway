import { Component } from '@angular/core';
import { Highway } from './highway.model';
import { HighwayService } from './highway.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  highways: Highway[] = [];
  highwaysAmount: number = 0;
  newHighway: Highway = new Highway('', NaN, '', true, '');
  selectedHighway: Highway = new Highway('', NaN, '', true, '');
  updateModalOn = false;
  deleteModalOn = false;

  body = {
    maxPageSize: 15,
    pageIndex: 1,
    pageSize: 100,
    keyword: '',
    sorting: '',
  };

  pageIndexCount = 0;
  pageIndexArray: number[] = [];
  newMaxPageSize = 15;
  newBodyKeyword = '';

  constructor(private highwayService: HighwayService) {}

  ngOnInit() {
    initFlowbite();
    this.onGetAllHighways();
  }

  //search highway
  onSearchHighways() {
    this.body.keyword = this.newBodyKeyword;
    this.onGetAllHighways();
  }

  //reset keyword
  onResetKeyword() {
    this.newBodyKeyword = '';
    this.body.keyword = '';
    this.onGetAllHighways();
  }

  //change hiển thị dòng/trang
  onChangePageSize() {
    this.body.maxPageSize = this.newMaxPageSize;
    this.body.pageIndex = 1;
    this.onGetAllHighways();
  }

  //change page
  onChangePage(pageNumber: number) {
    this.body.pageIndex = pageNumber;
    this.onGetAllHighways();
  }

  //previous page
  onPreviousPage() {
    if (this.body.pageIndex > 1) {
      this.body.pageIndex = this.body.pageIndex - 1;
    }
    this.onGetAllHighways();
  }

  //
  onNextPage() {
    if (this.body.pageIndex < this.pageIndexCount) {
      this.body.pageIndex = this.body.pageIndex + 1;
    }
    this.onGetAllHighways();
  }

  //get all highways
  onGetAllHighways() {
    this.highwayService.getAllHighways(this.body).subscribe((res: any) => {
      this.highways = res.data.items;
      this.highwaysAmount = res.data.totalCount;
      this.pageIndexCount = Math.floor(
        this.highwaysAmount / this.body.maxPageSize + 1
      );
      this.pageIndexArray = Array.from(
        { length: this.pageIndexCount },
        (_, i) => i + 1
      );
      console.log('----Get Highways List----');
    });
  }

  //get a highway by Id
  onGetAHighway(id: string) {
    this.highwayService.getHighwayByID(id).subscribe((res: any) => {
      this.selectedHighway = res.data;
      console.log(this.selectedHighway);
    });
  }

  //create a new highway
  onCreateAHighway() {
    this.highwayService
      .createANewHighway(this.newHighway)
      .subscribe((res: any) => {
        console.log(
          'A new highway has been created successfully!' + JSON.stringify(res)
        );
        this.onGetAllHighways();
      });
    this.newHighway = new Highway('', NaN, '', true, '');
  }

  //update a highway
  onUpdateAHighway() {
    this.highwayService
      .updateAHighway(this.selectedHighway)
      .subscribe((res: any) => {
        console.log('This highway has been updated successfully!');
        this.onGetAllHighways();
      });
    this.onToggleUpdateModal();
  }

  //delete a highway by Id
  onDeleteAHighway() {
    let id = this.selectedHighway.id;
    this.highwayService.deleteAHighway(id).subscribe((res: any) => {
      this.highways = this.highways.filter((highway) => highway.id !== id);
      console.log('This highway has been deleted successfully!');
      this.onGetAllHighways();
    });
    this.onToggleDeleteModal();
  }

  onToggleUpdateModal() {
    this.updateModalOn = !this.updateModalOn;
  }

  onOpenUpdateModal(id: string) {
    this.onToggleUpdateModal();
    this.onGetAHighway(id);
  }

  onToggleDeleteModal() {
    this.deleteModalOn = !this.deleteModalOn;
  }

  onOpenDeleteModal(id: string) {
    this.onToggleDeleteModal();
    this.onGetAHighway(id);
  }
}
