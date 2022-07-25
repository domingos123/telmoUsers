import { IDateProvider } from '../providers/DateProvider/IDateProvider';
import { DayjsDateProvider } from '../providers/DateProvider/implementations/DayjsDateProvider';
import { container } from "tsyringe";

container.registerSingleton<IDateProvider>(
    "DayjsDateProvider",
    DayjsDateProvider
)
