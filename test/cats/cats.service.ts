import { Injectable } from "@nestjs/common";
import { CreateCatDto } from "../dto/create-cat.dto";
import { Cat } from "../entities/cat.entity";
import { MetricsService } from "../metrics/metrics.service";

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: CreateCatDto): Cat {
    const catEntity: Cat = {
      id: this.cats.length + 1,
      ...cat,
    };
    this.cats.push(catEntity);
    return catEntity;
  }

  findOne(id: number): Cat {
    return this.cats[id];
  }
}
