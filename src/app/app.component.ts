import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public userForm: FormGroup;

  constructor(private _fb: FormBuilder) {}

  ngOnInit() {
    this.userForm = this._fb.group({
      tripName: ['', Validators.minLength(3)],
      noOfMembers: [''],
      members: this._fb.array([]),
    });
  }

  private addAddressGroup(): FormGroup {
    return this._fb.group({
      name: [],
      expense: this._fb.array([]),
    });
  }

  private expenseGroup(): FormGroup {
    return this._fb.group({
      expenseTitle: ['', Validators.required],
      amount: ['', [Validators.maxLength(10)]],
    });
  }

  get membersArray(): FormArray {
    return <FormArray>this.userForm.get('members');
  }

  formData(group) {
    return <FormArray>group.controls.expense.controls;
  }

  expenseObj(index, index1): void {
    <FormArray>(
      (<FormGroup>this.membersArray.controls[index]).controls['expense'][index]
        .controls
    );
  }

  addAddress(input): void {
    const value = input.value;
    for (let i = 0; i < value; i++) {
      this.membersArray.push(this.addAddressGroup());
    }
  }

  removeAddress(index: number): void {
    this.membersArray.removeAt(index);
  }

  addContact(index): void {
    (<FormArray>(
      (<FormGroup>this.membersArray.controls[index]).controls['expense']
    )).push(this.expenseGroup());
  }

  deletePhoneNumber(control, index) {
    control.removeAt(index);
  }

  onSubmitForm(form) {
    console.log(form.value);
  }
}
