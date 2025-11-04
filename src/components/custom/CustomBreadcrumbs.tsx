import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb.tsx";
import {Link} from "react-router";
import {SlashIcon} from "lucide-react";

interface Props{
    currentPage:string;
    breadcrumbs?:Breadcrumb[];
}

interface Breadcrumb{
    label:string;
    to:string;
}

export const CustomBreadcrumbs = ({currentPage, breadcrumbs = []}:Props) => {
    return (
        <>
        <Breadcrumb>
            <BreadcrumbList>

                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link to="/">Home</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                {
                    breadcrumbs.map(breadcrumb => (
                        <div className='flex items-center'>
                            <BreadcrumbItem>
                                <BreadcrumbSeparator>
                                    <SlashIcon />
                                </BreadcrumbSeparator>
                                <BreadcrumbLink asChild>
                                    <Link to={breadcrumb.to}>{breadcrumb.label}</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>

                        </div>
                    ))
                }
                <BreadcrumbSeparator>
                    <SlashIcon />
                </BreadcrumbSeparator>

                <BreadcrumbItem>
                    <BreadcrumbLink className='text-black'>{currentPage}</BreadcrumbLink>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
        </>
    );
};