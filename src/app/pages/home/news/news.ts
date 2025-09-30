import { Component } from '@angular/core';
import { SeasonStatsCard } from "../season-stats-card/season-stats-card";

@Component({
  selector: 'app-news',
  imports: [SeasonStatsCard],
  templateUrl: './news.html',
  styleUrl: './news.css'
})
export class News {

}
