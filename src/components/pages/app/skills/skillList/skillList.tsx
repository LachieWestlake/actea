import * as React from 'react';
import {useEffect, useState} from 'react';
import { SkillSearchResult, Skill} from "../../../../../database/skillsData";
import {skillsData} from "../../../../../database/data";
import LoadIcon from "../../components/loadIcon";
import SkillAndUsersCard from "./skillAndUsersCard";
import {debounce} from "../../../../../database/utils";

type SkillListProps = {};
export const SkillList: React.FunctionComponent<SkillListProps> = ({}) => {
    const [limit, setLimit] = useState<number>(10)
    const [searchResult, setSearchResult] = useState<SkillSearchResult>()
    const [loading, setLoading] = useState(true)
    const [noMore, setNoMore] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [loadingMore, setLoadingMore] = useState(false)
    const [loadingSearch, setLoadingSearch] = useState(false)

    useEffect(() => {
        getData()
    }, [searchTerm])

    const getData = async (limit: number = 10) => {
        skillsData.getSkills(limit, searchTerm).then(result => {
            if (limit !== result.matches.length) {
                setNoMore(true)
            } else {
                setNoMore(false)
            }
            result.matches = result.matches.filter(skill =>
                skillsData.filterUsersWithSkill(skill.skill).length > 0)
            setSearchResult(result)
            setLoading(false)
            setLoadingSearch(false)
            setLoadingMore(false)
        })
    }

    const searchTermStateDebounce = debounce((text) => {
        setSearchTerm(text)
    }, 500)

    const searchText = (text) => {
        setLoadingSearch(true)
        setNoMore(true)
        searchTermStateDebounce(text)
    }

    if (loading) return <LoadIcon/>

    const loadMoreSkills = () => {
        if (searchResult) {
            setLoadingMore(true)
            getData(limit + 10)
            setLimit(limit + 10)
        }
    }

    return (
        <div>
            <div className="flex justify-center mt-4 items-center">
                <i className="fas fa-search mr-3"/>
                <input type="text"
                       onChange={e => {
                           searchText(e.target.value)
                       }}
                       className={`border-b-2 py-1 px-2 w-64  block`}
                       name="title" placeholder={"I'd like some help with..."}/>
            </div>
            {loadingSearch ? <LoadIcon/> :
                searchResult?.matches
                    .map((match) => <SkillAndUsersCard key={match.skill.id} skill={match.skill}/>)
            }
            {noMore ? false : <button
                onClick={loadMoreSkills}
                className="bg-blue-700 hover:bg-blue-dark text-white font-bold py-2 px-4 m-auto block rounded-full my-3"
            >
                {loadingMore ? <span>Loading...</span> : <span>Load More</span>}
            </button>}
        </div>
    );
};