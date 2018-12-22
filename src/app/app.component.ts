import { Component,OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Clinilead-edu';
  isQuestionCardShow:boolean=false;
  isSubQuestionCard_1_Show:Boolean=false;
  mainIndex:number = 3;
  allMainQuestions: any = [{
    //Addition
    "id": 1,
		"question": "Kimberly had five oranges and six apples. How many fruits did she have in all?",
		"a": "11",
		"b": "10",
		"c": "13",
		"d": "-1",
    "answer": "a",
    "tag":"main"
	},
	{
    //Substraction
		"id": 2,
		"question": "John has thirteen Pokemon cards, if he gives two away, how many will he have left?",
		"a": "15",
		"b": "11",
		"c": "14",
		"d": "9",
    "answer": "b",
    "tag":"main"
	},
	{
    //Multiplication
		"id": 3,
		"question": "What is the result of 5*3?",
		"a": "8",
		"b": "2",
		"c": "15",
		"d": "1",
    "answer": "c",
    "tag":"main"
	}
  ];
  allSubQuestions: any = [{
    "id": 1,
		"question": "Find the sum of the given numbers. 18 + 2  ?",
		"a": "20",
		"b": "16",
		"c": "17",
		"d": "15",
    "answer": "a",
    "tag":"sub"
  },
  {
    "id": 1,
		"question": "Find the sum of the given numbers. 15 + 3 ? ",
		"a": "17",
		"b": "18",
		"c": "12",
		"d": "0",
    "answer": "b",
    "tag":"sub"
  },
  { "id": 1,
		"question": "Find the sum of the given numbers. 15 + 4  ?",
		"a": "19",
		"b": "20",
		"c": "18",
		"d": "17",
    "answer": "a",
    "tag":"sub"
  },
  {
    "id": 2,
		"question": "Find the difference. 8 – 4 = ? ",
		"a": "12",
		"b": "14",
		"c": "4",
		"d": "0",
    "answer": "c",
    "tag":"sub"
  },
  {
    "id": 2,
		"question": "Find the difference. 6 – 4 = ?",
		"a": "2",
		"b": "4",
		"c": "0",
		"d": "2",
    "answer": "d",
    "tag":"sub"
  },
  {
    "id": 2,
		"question": "Find the difference. 5 – 4 = ?",
		"a": "1",
		"b": "9",
		"c": "8",
		"d": "5",
    "answer": "a",
    "tag":"sub" 
  }
];
index:number=0
//based on user actions Store subQn
public subQuestion:any =[{

}];
public mainQuestion :any = [{
    //Addition
    "id": 1,
		"question": "Kimberly had five oranges and six apples. How many fruits did she have in all?",
		"a": "11",
		"b": "10",
		"c": "13",
		"d": "-1",
    "answer": "a",
    "tag":"main"
}];
  flag:number = 0
  mainQnId:number = 0
  point1:number = 0 //subIndex
  point2:number = 1 //mainIndex
  public SubQuestn:boolean=false;
  constructor( private toastr: ToastrService) { 
    //console.log(this.allMainQuestions[0].tag)
    //console.log(this.mainQuestion[0])
    //console.log(this.allMainQuestions[0])
  }

  ansCheck(value:string,id:number,tag:string){
    console.log(tag)
    if(this.allMainQuestions[id-1].answer == value && tag == "main")
    {
      console.log('Correct answer')
      this.toastr.success('You got a perfect answer !', 'Awesome ');
      this.isSubQuestionCard_1_Show = false;
    }
    if(tag == "sub")
    {
          if(this.subQuestion[this.point1-1].answer == value )
          {
              console.log('Correct answer')
              this.toastr.success('You got a perfect answer !', 'Awesome ');
          }
          else
          {
            console.log('Incorrect answer  ')
            this.toastr.success('You should probably try again !', ' Whoops ');
          }
    }
    if(this.allMainQuestions[id-1].answer != value && tag == "main")
    {
      console.log('Incorrect answer  ')
      this.toastr.success('You should probably try again !', ' Whoops ');
      this.SubQuestionFilter(id);
    }
  }

  first:number = 0;
  second:number =0;

  SubQuestionFilter(id:number){
    this.first=id
    if(this.first != this.second)
    {
      this.index = 0;
      for (let quest of this.allSubQuestions)
        if(quest['id'] == id)
        {
          this.subQuestion[this.index]=quest
          this.index=this.index+1
        }
      console.log(this.subQuestion)
      //console.log(this.index)
      this.second=this.first;
      this.first = 0;
      //this.isSubQuestionCard_1_Show = true;
    }
    else
    {
      //this.isSubQuestionCard_1_Show = true;
    }
    }

  StartQuiz(){
   
    this.isQuestionCardShow = true;
  }
  HomePage():void{
  }
  SubmitTest():void{
  }
  
 
  submitQn(str:string,ans:string,tag:string):void{
  //Load Main Question
    if(str ==  ans && tag == "main")
    {
        if (this.point2<this.mainIndex)
        {
            this.mainQuestion[0]=this.allMainQuestions[this.point2];
            this.point2=this.point2+1
        }
        else
        {
          console.log('Main Qn Ended')
        }
    }
  //Store next Sub Question
    if ( tag == "sub" )
    {
        if(this.point1<this.index)
        {
            this.mainQuestion[0]=this.subQuestion[this.point1]
            this.point1= this.point1+1
        }
   //Store Next Main Question
        else
        {
          console.log('Sub Qn Ended')
          this.mainQuestion[0]=this.allMainQuestions[this.point2]
          this.point2=this.point2+1
          this.subQuestion =[{
          }];
          this.point1 = 0
        }
    }
  //Load Sub Question
    if( tag == "main" && str != ans){
        if (this.point2<this.mainIndex)
        {
          this.mainQuestion[0]=this.subQuestion[this.point1]
          this.point1= this.point1+1
        }
        else
        {
          console.log('Main Qn Ended')
        }
      }

    }
}
