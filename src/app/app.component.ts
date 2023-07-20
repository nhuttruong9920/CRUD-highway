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

  constructor(private highwayService: HighwayService) {}
  ngOnInit() {
    initFlowbite();
    this.onGetAllHighways();
  }
  //get all highways
  onGetAllHighways() {
    this.highwayService.getAllHighways().subscribe((res: any) => {
      this.highways = res.data.items;
      this.highwaysAmount = res.data.totalCount;
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
