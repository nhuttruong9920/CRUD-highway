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
  newHighway: Highway = new Highway('', 120, '', true, '');
  selectedHighway: Highway = new Highway('', 0, '', true, '');

  constructor(private highwayService: HighwayService) {}
  //get all highways
  ngOnInit() {
    initFlowbite();
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
      });
    this.newHighway = new Highway('', 120, '', true, '');
  }

  //update a highway
  onUpdateAHighway() {
    this.highwayService
      .updateAHighway(this.selectedHighway)
      .subscribe((res: any) => {
        console.log('This highway has been updated successfully!');
      });
  }

  //delete a highway by Id
  onDeleteAHighway(id: string) {
    this.highwayService.deleteAHighway(id).subscribe((res: any) => {
      this.highways = this.highways.filter((highway) => highway.id !== id);
      console.log('This highway has been deleted successfully!');
    });
  }
}
