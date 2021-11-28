// import { ClassSerializerInterceptor, UseInterceptors } from "@nestjs/common"
import { MessagePattern } from "@nestjs/microservices"
import { Microservice } from "src/core/decorators/microservice.decorator"
import { Value } from "src/core/decorators/value.decorator"
import { MessagePatternEnum } from "src/microservice/enum/message-pattern.enum"

@Microservice()
export class ReportMicroservice {
  constructor() {}

  @MessagePattern(MessagePatternEnum.CREATE_REPORT)
  createReport(@Value() data: number[]): any {
    console.log(data)
    return [
      { name: 'Report 1', id: '41793479' },
      { name: 'Report 2', id: '789x' },
    ]
  }

//   @MessagePattern(MessagePatternEnum.GET_REPORT)
//   @UseInterceptors(ClassSerializerInterceptor)
//   async getReport(@Value() reportId: string): Promise<Report> {
//     return this.esgReportService.getOriginReport(reportId)
//   }
}