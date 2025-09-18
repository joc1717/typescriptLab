import {Friend, Colleague, EmailContact } from './myTypes'
import { friends, colleagues } from './01-basics'

function older(f: Friend) {
     f.age += 1
     return `${f.name} is now ${f.age}` 
}

//console.log(older(friends[0]))

function allOlder(friends: Friend[]) {
    const olderFriends = []
    for (const friend of friends) {
        olderFriends.push(older(friend))
    }
    return olderFriends
}

//console.log(allOlder(friends))

// Find the colleague with the highest extension number.
function highestExtension(cs: Colleague[]) {
  const result = cs.sort(
    (c1, c2) => c1.contact.extension - c2.contact.extension
  );
  return result[cs.length - 1];
}

function addColleague(cs: Colleague[], name: string, department: string, email:string) {
    const maxExt = highestExtension(cs).contact.extension
    const newColleague: Colleague = {
        name: name,
        department: department,
        contact: {
            email: email,
            extension: maxExt + 1
        }
    }
    cs.push(newColleague)
}

//console.log(highestExtension(colleagues.current));

addColleague(colleagues.current, "Sheild O Connell", "HR", "soc@here.com");
//console.log(colleagues.current.filter((c) => c.name === "Sheild O Connell"));

function sortColleagues(
  colleagues: Colleague[],
  sorter: (c1: Colleague, c2: Colleague) => number,
  max? : number
): EmailContact[] {
  let end = colleagues.length;
  if (max !== undefined) {
     end = max < 2 ? 1 : max
  }
  const sorted = colleagues.sort(sorter); // Colleague[] inferred
  const result: EmailContact[] = sorted.map((ce) => ({ name: ce.name, email: ce.contact.email }));
  return result.slice(0, end) 
}

//console.log(sortColleagues(colleagues.current, (a, b) => a.contact.extension - b.contact.extension, 2));
//console.log(sortColleagues(colleagues.current, (a, b) => a.name.length - b.name.length, 1));

function findFriends(friends: Friend[], criteria: (f: Friend) => boolean) {
    const filteredFriends = friends.filter(criteria) 
    const result: string[] = [];
    for (const friend of filteredFriends) {
      result.push(friend.name);
    }
    return result;
}
//console.log(friends);
//console.log(findFriends(friends, (friend) => friend.name.startsWith('Pa')));
//console.log(findFriends(friends, (friend) => friend.age < 35));

function addInterest(friend : Friend, interest : string) {
  return friend.interests?.concat(interest)
}

console.log(addInterest(friends[1], 'Politics'))