<?php header("Access-Control-Allow-Origin: *"); ?>

<ion-header>

  <ion-navbar>
    <button ion-button menuToggle>
      <ion-icon name="menu"></ion-icon>
    </button>
    <ion-title>Kojak Pronos</ion-title>
  </ion-navbar>
</ion-header>

<ion-content padding style="background-image: url(/assets/background.png); no-repeat center;background-size:cover;">

  
  <ion-refresher (ionRefresh)="doRefresh($event)">
    <ion-refresher-content></ion-refresher-content>
  </ion-refresher>
  <div class="article"><img style="width: 500px;" src="/assets/test.jpg"></div>
<div class="pronostic2"> PRONOSTICS DU JOUR <br>
<div class="date">jeudi 05 octobre 2017</div></div>
  <div class="pronostic" *ngFor="let prono of pronos" (click)="goto(prono)">

    <div style="text-align: center;" class="">

    <table >
   <tr>
       <td> <div class="equipa">{{prono.eq1}}</div></td>
       <td class="logoequipe"><img [src]="prono.logo1" height="25" width="25" /></td>
       <td> <div class="hora" *ngIf="!prono.vip">{{prono.heure}} </div></td>
       <td class="logoequipe"> <img [src]="prono.logo2" height="25" width="25" /></td>
       <td class="equipa"> {{prono.eq2}} </td>
       <td style="color:#110E1C;   "><ion-icon name="md-arrow-round-forward"></ion-icon></td>

   </tr>
  
</table>
        
            
            
   
     </div>
    

    <div *ngIf="prono.vip">
      <h1 text-center>RESERVE VIP</h1>
    </div>


     


  </div>
<BR>
<BR><BR><BR>
  <div class="pronostic2"> DERNIERS RéSULTATS <br>
<div class="date">BILAN</div></div>
  <div class="pronostic" *ngFor="let prono of pronos" (click)="goto(prono)">

    <div style="text-align: center;" class="">

    <table >
   <tr>
       <td> <div class="equipa">{{prono.eq1}}</div></td>
       <td class="logoequipe"><img [src]="prono.logo1" height="25" width="25" /></td>
       <td> <div class="hora" *ngIf="!prono.vip">2-1 </div></td>
       <td class="logoequipe"> <img [src]="prono.logo2" height="25" width="25" /></td>
       <td class="equipa"> {{prono.eq2}} </td>
       <td style="color:#110E1C;   "><ion-icon name="md-arrow-round-forward"></ion-icon></td>

   </tr>
  
</table>
        
            
            
   
     </div>
    

    <div *ngIf="prono.vip">
      <h1 text-center>RESERVE VIP</h1>
    </div>


     


  </div>

<BR>
<BR><BR><BR>
  <div class="pronostic2"> DERNIERS RéSULTATS <br>
<div class="date">BILAN</div></div>
  <div class="pronostic" *ngFor="let prono of pronos" (click)="goto(prono)">

    <div style="text-align: center;" class="">

    <table >
   <tr>
       <td> <div class="equipa">{{classement.logo1}}</div></td>
       <td class="logoequipe"><img [src]="prono.logo1" height="25" width="25" /></td>
       <td> <div class="hora" *ngIf="!prono.vip">2-1 </div></td>
       <td class="logoequipe"> <img [src]="prono.logo2" height="25" width="25" /></td>
       <td class="equipa"> {{prono.eq2}} </td>
       <td style="color:#110E1C;   "><ion-icon name="md-arrow-round-forward"></ion-icon></td>

   </tr>
  
</table>
        
            
            
   
     </div>
    

    <div *ngIf="prono.vip">
      <h1 text-center>RESERVE VIP</h1>
    </div>


     


  </div>







</ion-content>